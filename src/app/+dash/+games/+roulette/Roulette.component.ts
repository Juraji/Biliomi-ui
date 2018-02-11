import {Component, OnInit} from "@angular/core";
import {RouletteRecordsClient} from "../../../shared/modules/biliomi/clients/model/RouletteRecords.client";
import {RouletteSettingsClient} from "../../../shared/modules/biliomi/clients/settings/RouletteSettings.client";
import {DialogsService} from "../../../shared/modules/dialogs/services/Dialogs.service";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {FormControl, Validators} from "@angular/forms";
import IRouletteRecord = Biliomi.IRouletteRecord;

@Component({
  selector: "roulette",
  templateUrl: require("./Roulette.template.html")
})
export class RouletteComponent implements OnInit {
  private _rouletteRecordsClient: RouletteRecordsClient;
  private _rouletteSettingsClient: RouletteSettingsClient;
  private _dialogsService: DialogsService;

  public dataSource: RestTableDataSource<IRouletteRecord> = new RestTableDataSource<IRouletteRecord>();

  public filterMapping: TableFilterNameMapping = {
    "Username": "User.Username"
  };

  public enableTimeoutControl: FormControl = new FormControl(false);
  public timeoutControl: FormControl = new FormControl(0, [Validators.required, Validators.min(1e4)]);

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Roulette Records",
    sheetName: "Roulette Records",
    columns: [
      {objectPath: "$.User.DisplayName", headerName: "Username"},
      {objectPath: "$.Fatal", headerName: "Fatal", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE}
    ]
  };

  constructor(rouletteRecordsClient: RouletteRecordsClient,
              rouletteSettingsClient: RouletteSettingsClient,
              dialogsService: DialogsService) {
    this._rouletteRecordsClient = rouletteRecordsClient;
    this._rouletteSettingsClient = rouletteSettingsClient;
    this._dialogsService = dialogsService;

    this.dataSource.client = rouletteRecordsClient;
  }

  public get isSettingsFormOk(): boolean {
    return !this.enableTimeoutControl.value
      || this.timeoutControl.valid;
  }

  public ngOnInit() {
    this.initSettingsFields();
  }

  public async initSettingsFields() {
    await this._rouletteSettingsClient.load(true);
    this.enableTimeoutControl.reset(this._rouletteSettingsClient.TimeoutOnDeathEnabled);
    this.timeoutControl.reset(this._rouletteSettingsClient.TimeoutOnDeath);
  }

  public async saveSettings() {
    if (this.isSettingsFormOk) {
      this._rouletteSettingsClient.TimeoutOnDeathEnabled = this.enableTimeoutControl.value;
      this._rouletteSettingsClient.TimeoutOnDeath = this.timeoutControl.value;
      let result = await this._rouletteSettingsClient.save();

      return result != null;
    }

    return null;
  }
}
