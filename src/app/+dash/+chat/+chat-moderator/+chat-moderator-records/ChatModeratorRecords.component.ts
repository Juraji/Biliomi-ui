import {Component} from "@angular/core";
import {ModerationRecordsClient} from "../../../../shared/modules/biliomi/clients/model/ModerationRecords.client";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {
  XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_ENUM
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/DataTable";
import {DialogsService} from "../../../../shared/modules/dialogs/services/Dialogs.service";
import IModerationRecord = Biliomi.IModerationRecord;

@Component({
  selector: "chat-moderator-records",
  templateUrl: require("./ChatModeratorRecords.template.html")
})
export class ChatModeratorRecordsComponent {
  private _dialog: DialogsService;
  private _moderationRecordsClient: ModerationRecordsClient;
  private recordsDataSource: RestTableDataSource<IModerationRecord> = new RestTableDataSource<IModerationRecord>();

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Moderation Records",
    sheetName: "Moderation Records",
    columns: [
      {objectPath: "$.User.DisplayName", headerName: "Username"},
      {objectPath: "$.Action", headerName: "Action", formatter: XLSX_FORMATTER_ENUM},
      {objectPath: "$.Reason", headerName: "Reason", formatter: XLSX_FORMATTER_ENUM},
      {objectPath: "$.Message", headerName: "Message"},
      {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE}
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "Username": "User.Username"
  };

  constructor(moderationRecordsClient: ModerationRecordsClient, dialog: DialogsService) {
    this._dialog = dialog;
    this._moderationRecordsClient = moderationRecordsClient;
    this.recordsDataSource.client = moderationRecordsClient;
  }

  public async deleteRecord(record: IModerationRecord) {
    let confirmed = await this._dialog.confirm(`Are you sure you want to delete this record for ${record.User.DisplayName}?`);

    if (confirmed) {
      await this._moderationRecordsClient.delete(record.Id);
      this.recordsDataSource.update();
    }
  }
}
