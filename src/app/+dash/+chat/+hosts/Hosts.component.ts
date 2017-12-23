import {Component} from "@angular/core";
import {HostRecordsClient} from "../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {ConfirmDialogComponent} from "../../../shared/components/ConfirmDialog.component";
import {MatDialog} from "@angular/material";
import {BiliomiApiService} from "../../../shared/modules/biliomi/services/BiliomiApi.service";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/TableFilterMapping.interface";
import IHostRecord = Biliomi.IHostRecord;
import IDirection = Biliomi.IDirection;

@Component({
  selector: "hosts-page",
  templateUrl: require("./Hosts.template.pug")
})
export class HostsComponent {
  private _api: BiliomiApiService;
  private _hostRecordsClient: HostRecordsClient;
  private _dialog: MatDialog;

  public incomingRecordsDataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();
  public outgoingRecordsDataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Host Records",
    sheetName: "Host Records",
    columns: [
      {objectPath: "$.Direction", headerName: "Direction"},
      {objectPath: "$.User.DisplayName", headerName: "Username"},
      {objectPath: "$.Date", headerName: "Follow date", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.AutoHost", headerName: "Was auto host", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "username": "User.Username"
  };

  constructor(api: BiliomiApiService, hostRecordsClient: HostRecordsClient, dialog: MatDialog) {
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

  public updateOnRecordCreated(record: IHostRecord) {
    if (record.Direction == IDirection.INCOMING) {
      this.incomingRecordsDataSource.update();
    } else {
      this.outgoingRecordsDataSource.update();
    }
  }

  public hostNow(record: IHostRecord) {
    this._dialog.open(ConfirmDialogComponent, {
      data: "Are you sure you want to host " + record.User.DisplayName + "?"
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        this._api.postCommand("host", record.User.Username);
      }
    });
  }

  public async deleteRecord(record: IHostRecord) {
    this._dialog.open(ConfirmDialogComponent, {
      data: "Are you sure you want to delete this record for " + record.User.DisplayName + "?"
    }).afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        let result: boolean = await this._hostRecordsClient.delete(record.Id);
        if (result) {
          this.updateOnRecordCreated(record);
        }
      }
    });
  }
}
