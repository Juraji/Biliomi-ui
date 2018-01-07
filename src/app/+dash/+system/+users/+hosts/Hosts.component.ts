import {Component} from "@angular/core";
import {HostRecordsClient} from "../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {BiliomiApiService} from "../../../../shared/modules/biliomi/services/BiliomiApi.service";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/DataTable";
import {ConfirmDialogService} from "../../../../shared/modules/confirm-dialog/services/ConfirmDialog.service";
import IHostRecord = Biliomi.IHostRecord;
import IDirection = Biliomi.IDirection;

@Component({
  selector: "hosts-page",
  templateUrl: require("./Hosts.template.pug")
})
export class HostsComponent {
  private _api: BiliomiApiService;
  private _hostRecordsClient: HostRecordsClient;
  private _dialog: ConfirmDialogService;

  public incomingRecordsDataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();
  public outgoingRecordsDataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Host Records",
    sheetName: "Host Records",
    columns: [
      {objectPath: "$.Direction", headerName: "Direction"},
      {objectPath: "$.User.DisplayName", headerName: "Username"},
      {objectPath: "$.Date", headerName: "Follow date", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.AutoHost", headerName: "Was auto host", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO}
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "username": "User.Username"
  };

  constructor(api: BiliomiApiService, hostRecordsClient: HostRecordsClient, dialog: ConfirmDialogService) {
    this._api = api;
    this._hostRecordsClient = hostRecordsClient;
    this._dialog = dialog;

    this.incomingRecordsDataSource.client = hostRecordsClient;
    this.incomingRecordsDataSource.clientParams
      .set("direction", IDirection.INCOMING);

    this.outgoingRecordsDataSource.client = hostRecordsClient;
    this.outgoingRecordsDataSource.clientParams
      .set("direction", IDirection.OUTGOING);
  }

  public updateOnRecordChanged(record: IHostRecord) {
    if (record.Direction === IDirection.INCOMING) {
      this.incomingRecordsDataSource.update();
    } else {
      this.outgoingRecordsDataSource.update();
    }
  }

  public hostNow(record: IHostRecord) {
    this._dialog.confirm(`Are you sure you want to host ${record.User.DisplayName}?`)
      .filter((confirmed: boolean) => confirmed)
      .subscribe(() => this._api.postCommand("host", record.User.Username));
  }

  public async deleteRecord(record: IHostRecord) {
    this._dialog.confirm(`Are you sure you want to delete this record for ${record.User.DisplayName}?`)
      .filter((confirmed: boolean) => confirmed)
      .subscribe(async () => {
        let result: boolean = await this._hostRecordsClient.delete(record.Id);
        if (result) {
          this.updateOnRecordChanged(record);
        }
      });
  }
}
