import {Component, ViewChild} from "@angular/core";
import {RaidRecordsClient} from "../../../shared/modules/biliomi/clients/model/RaidRecords.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {UserAutoCompleteComponent} from "../../../shared/components/UserAutoComplete.component";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {FormControl} from "@angular/forms";
import {DialogsService} from "../../../shared/modules/dialogs/services/Dialogs.service";
import {DatePipe} from "../../../shared/pipes/Date.pipe";
import {CaseToWordPipe, CaseType} from "../../../shared/pipes/CaseToWord.pipe";
import IRaidRecord = Biliomi.IRaidRecord;
import IDirection = Biliomi.IDirection;

@Component({
  selector: "raids",
  templateUrl: require("./Raids.template.html")
})
export class RaidsComponent {
  private _raidRecordsClient: RaidRecordsClient;
  private _dialogs: DialogsService;

  public dataSource: RestTableDataSource<IRaidRecord> = new RestTableDataSource<IRaidRecord>();
  public recordDirectionControl: FormControl = new FormControl(IDirection.INCOMING);

  @ViewChild("userControl")
  public userControl: UserAutoCompleteComponent;

  public tableFilterMapping: TableFilterNameMapping = {
    "channel": "Channel.Username",
    "was playing": "GameAtMoment"
  };

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Raids",
    sheetName: "Raids",
    columns: [
      {objectPath: "$.Channel.DisplayName", headerName: "Username"},
      {objectPath: "$.Direction", headerName: "Direction"},
      {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.GameAtMoment", headerName: "Was playing"}
    ]
  };

  constructor(raidRecordsClient: RaidRecordsClient, dialogs: DialogsService) {
    this._raidRecordsClient = raidRecordsClient;
    this._dialogs = dialogs;
    this.dataSource.client = raidRecordsClient;
  }

  public get isFormOk(): boolean {
    return this.userControl.valid;
  }

  public async saveRaid(): Promise<boolean> {
    if (this.isFormOk) {
      let direction = this.recordDirectionControl.value;
      let user = this.userControl.user;

      let confirmed = await this._dialogs.confirm(`Are you sure you want to record an ${direction.toLowerCase()} raid from ${user.DisplayName}?`);

      if (confirmed) {
        let success = await this._raidRecordsClient.registerRaid(direction, user.Username);
        if (success) {
          this.dataSource.update();
        }

        return success;
      }
    }

    return null;
  }

  public async deleteRecord(record: IRaidRecord) {
    let date = new DatePipe().transform(record.Date);
    let direction = new CaseToWordPipe().transform(record.Direction, CaseType.ENUM);

    let confirmed = await this._dialogs.confirm(`Are you sure you want to delete this ${direction} raid record on ${date} by ${record.Channel.DisplayName}?`);

    if (confirmed) {
      let success = await this._raidRecordsClient.delete(record.Id);
      if (success) {
        this.dataSource.update();
      }
    }
  }
}
