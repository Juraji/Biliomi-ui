import {Component} from "@angular/core";
import {ModerationRecordsClient} from "../../../../shared/modules/biliomi/clients/model/ModerationRecords.client";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {
  XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_ENUM
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {MatDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../../../../shared/components/ConfirmDialog.component";
import IModerationRecord = Biliomi.IModerationRecord;
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/TableFilterMapping.interface";

@Component({
  selector: "chat-moderator-records",
  templateUrl: require("./ChatModeratorRecords.template.pug")
})
export class ChatModeratorRecordsComponent {
  private _dialog: MatDialog;
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

  constructor(moderationRecordsClient: ModerationRecordsClient, dialog: MatDialog) {
    this._dialog = dialog;
    this._moderationRecordsClient = moderationRecordsClient;
    this.recordsDataSource.client = moderationRecordsClient;
  }

  public deleteRecord(record: IModerationRecord) {
    this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete this record for ${record.User.DisplayName}?`
    }).afterClosed()
      .filter((choice: boolean) => choice)
      .subscribe(async () => {
        await this._moderationRecordsClient.delete(record.Id);
        this.recordsDataSource.update();
      });
  }
}
