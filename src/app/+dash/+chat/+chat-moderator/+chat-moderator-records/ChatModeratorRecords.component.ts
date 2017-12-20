import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {ModerationRecordsClient} from "../../../../shared/modules/biliomi/clients/model/ModerationRecords.client";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatPaginator} from "@angular/material";
import {XlsxExporter} from "../../../../shared/modules/xlsx-export/classes/XlsxExporter";
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
export class ChatModeratorRecordsComponent implements AfterViewInit {
  private recordsDataSource: RestTableDataSource<IModerationRecord> = new RestTableDataSource<IModerationRecord>();

  @ViewChild("paginator", {read: MatPaginator})
  public paginator: MatPaginator;

  constructor(moderationRecordsClient: ModerationRecordsClient) {
    this.recordsDataSource.bindClient(moderationRecordsClient);
    this.recordsDataSource.sortBuilder.add("Date", true)
  }

  public ngAfterViewInit() {
    this.recordsDataSource.paginator = this.paginator;
    this.recordsDataSource.update();
  }

  public exportRecords() {
    let config: IXlsxExportConfig = {
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

    let exporter = new XlsxExporter(config);
    exporter.exportData(this.recordsDataSource.data);
  }
}
