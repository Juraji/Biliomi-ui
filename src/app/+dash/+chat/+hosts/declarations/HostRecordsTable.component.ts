import {Component, Input, OnInit} from "@angular/core";
import {TableDataSource} from "../../../../shared/modules/data-table/classes/TableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {HostRecordsClient} from "../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {MatDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../../../../shared/components/ConfirmDialog.component";
import {BiliomiApiService} from "../../../../shared/modules/biliomi/services/BiliomiApi.service";
import IHostRecord = Biliomi.IHostRecord;

@Component({
  selector: "host-records-table-component",
  templateUrl: require("./HostRecordsTable.template.pug")
})
export class HostRecordsTableComponent implements OnInit {
  private _api: BiliomiApiService;
  private _hostRecordsClient: HostRecordsClient;
  private _dialog: MatDialog;

  @Input("dataSource")
  public dataSource: TableDataSource<IHostRecord>;

  constructor(api: BiliomiApiService, hostRecordsClient: HostRecordsClient, dialog: MatDialog) {
    this._api = api;
    this._hostRecordsClient = hostRecordsClient;
    this._dialog = dialog;
  }

  public ngOnInit() {
    this.dataSource.update();
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
          this.dataSource.update();
        }
      }
    });
  }
}
