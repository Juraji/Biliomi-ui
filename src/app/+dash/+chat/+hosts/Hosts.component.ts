import {Component} from "@angular/core";
import {HostRecordsClient} from "../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {TableDataSource} from "../../../shared/modules/data-table/classes/TableDataSource";
import {SortBuilder} from "../../../shared/modules/biliomi/classes/SortBuilder";
import IHostRecord = Biliomi.IHostRecord;
import IDirection = Biliomi.IDirection;
import {ConfirmDialogComponent} from "../../../shared/components/ConfirmDialog.component";
import {MatDialog} from "@angular/material";
import {BiliomiApiService} from "../../../shared/modules/biliomi/services/BiliomiApi.service";

@Component({
  selector: "hosts-page",
  templateUrl: require("./Hosts.template.pug")
})
export class HostsComponent {
  private _api: BiliomiApiService;
  private _hostRecordsClient: HostRecordsClient;
  private _dialog: MatDialog;

  public incomingRecordsDataSource: TableDataSource<IHostRecord>;
  public outgoingRecordsDataSource: TableDataSource<IHostRecord>;
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

  constructor(api: BiliomiApiService, hostRecordsClient: HostRecordsClient, dialog: MatDialog) {
    this._api = api;
    this._hostRecordsClient = hostRecordsClient;
    this._dialog = dialog;
  }

  public ngOnInit() {
    this.incomingRecordsDataSource = new TableDataSource<IHostRecord>(() => this._hostRecordsClient.getIncomingRecords());
    this.outgoingRecordsDataSource = new TableDataSource<IHostRecord>(() => this._hostRecordsClient.getOutgoingRecords());

    this.incomingRecordsDataSource.update();
    this.outgoingRecordsDataSource.update();
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
