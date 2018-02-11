import {Component, OnInit} from "@angular/core";
import {AdventureRecordsClient} from "../../../shared/modules/biliomi/clients/model/AdventureRecords.client";
import {AdventureSettingsClient} from "../../../shared/modules/biliomi/clients/settings/AdventureSettings.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import IAdventureRecord = Biliomi.IAdventureRecord;

@Component({
  selector: "adventures",
  templateUrl: require("./Adventures.template.html")
})
export class AdventuresComponent implements OnInit {
  private _adventureSettingsClient: AdventureSettingsClient;

  public adventureRecordsDataSource: RestTableDataSource<IAdventureRecord> = new RestTableDataSource<IAdventureRecord>();
  public joinTimeoutControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public minimumBetControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public maximumBetControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public cooldownControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public winMultiplierControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  public filterMapping: TableFilterNameMapping = {
    "username": "Adventurer.Username",
    "By Tamagotchi": "ByTamagotchi"
  };

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Achievements",
    sheetName: "Achievements",
    columns: [
      {objectPath: "$.Adventurer.DisplayName", headerName: "Username"},
      {objectPath: "$.Bet", headerName: "Bet"},
      {objectPath: "$.Payout", headerName: "Payout"},
      {objectPath: "$.ByTamagotchi", headerName: "By Tamagotchi", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE}
    ]
  };

  constructor(adventureRecordsClient: AdventureRecordsClient,
              adventureSettingsClient: AdventureSettingsClient) {
    this.adventureRecordsDataSource.client = adventureRecordsClient;
    this._adventureSettingsClient = adventureSettingsClient;
  }

  public get isSettingsFormOk(): boolean {
    return this.joinTimeoutControl.valid
      && this.minimumBetControl.valid
      && this.maximumBetControl.valid
      && this.cooldownControl.valid
      && this.winMultiplierControl.valid
      && this.minimumBetControl.value < this.maximumBetControl.value;
  }

  public ngOnInit() {
    this.initSettingsFields();
  }

  public async initSettingsFields() {
    await this._adventureSettingsClient.load(true);
    this.joinTimeoutControl.reset(this._adventureSettingsClient.JoinTimeout);
    this.joinTimeoutControl.reset(this._adventureSettingsClient.JoinTimeout);
    this.minimumBetControl.reset(this._adventureSettingsClient.MinimumBet);
    this.maximumBetControl.reset(this._adventureSettingsClient.MaximumBet);
    this.cooldownControl.reset(this._adventureSettingsClient.Cooldown);
    this.winMultiplierControl.reset(this._adventureSettingsClient.WinMultiplier);
  }

  public async saveSettings(): Promise<boolean> {
    if (this.isSettingsFormOk) {
      this._adventureSettingsClient.JoinTimeout = this.joinTimeoutControl.value;
      this._adventureSettingsClient.MinimumBet = this.minimumBetControl.value;
      this._adventureSettingsClient.MaximumBet = this.maximumBetControl.value;
      this._adventureSettingsClient.Cooldown = this.cooldownControl.value;
      this._adventureSettingsClient.WinMultiplier = this.winMultiplierControl.value;

      let result = this._adventureSettingsClient.save();
      if (result) {
        this.initSettingsFields();
      }

      return result != null;
    }

    return null;
  }
}
