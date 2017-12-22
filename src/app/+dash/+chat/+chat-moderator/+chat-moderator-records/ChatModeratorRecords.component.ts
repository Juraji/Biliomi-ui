import {AfterViewInit, Component} from "@angular/core";
import {ModerationRecordsClient} from "../../../../shared/modules/biliomi/clients/model/ModerationRecords.client";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {
  XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_ENUM
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import IModerationRecord = Biliomi.IModerationRecord;

@Component({
  selector: "chat-moderator-records",
  templateUrl: require("./ChatModeratorRecords.template.pug")
})
export class ChatModeratorRecordsComponent {
  private recordsDataSource: RestTableDataSource<IModerationRecord> = new RestTableDataSource<IModerationRecord>();

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Moderation Records",
    sheetName: "Moderation Records",
    columns: [
      {objectPath: "$.User.DisplayName", headerName: "Username"},
      {objectPath: "$.Action", headerName: "Action", formatter: XLSX_FORMATTER_ENUM},
      {objectPath: "$.Reason", headerName: "Reason", formatter: XLSX_FORMATTER_ENUM},
      {objectPath: "$.Message", headerName: "Message"},
      {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE},
    ]
  };

  constructor(moderationRecordsClient: ModerationRecordsClient) {
    this.recordsDataSource.client = moderationRecordsClient;
  }
}
