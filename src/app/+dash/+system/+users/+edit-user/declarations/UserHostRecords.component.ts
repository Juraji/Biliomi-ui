import {Component, Optional} from "@angular/core";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {HostRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {DialogsService} from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import {EditUserComponent} from "../EditUser.component";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IHostRecord = Biliomi.IHostRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;
import IDirection = Biliomi.IDirection;

@Component({
  selector: "user-host-records",
  templateUrl: require("./UserHostRecords.template.pug")
})
export class UserHostRecordsComponent {
  private _editUserComponent: EditUserComponent;
  private _hostRecordsClient: HostRecordsClient;
  private _dialog: DialogsService;

  public dataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();

  public get totalIncoming(): number {
    return this.dataSource.currentData
      .filter((r: IHostRecord) => r.Direction === IDirection.INCOMING)
      .length;
  }

  public get totalOutgoing(): number {
    return this.dataSource.currentData
      .filter((r: IHostRecord) => r.Direction === IDirection.OUTGOING)
      .length;
  }

  constructor(@Optional() editUserComponent: EditUserComponent,
              hostRecordsClient: HostRecordsClient,
              dialog: DialogsService) {
    this._editUserComponent = editUserComponent;
    this._hostRecordsClient = hostRecordsClient;
    this._dialog = dialog;

    this.dataSource.client = hostRecordsClient;
    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("user.username", IRestFilterOperator.EQUALS, editUserComponent.user.Username)
        .toString());
    }
  }

  public hostUser() {
    this._dialog.confirm(`Are you sure you want to host ${this._editUserComponent.user.DisplayName}?`)
      .filter((confirmed: boolean) => confirmed)
      .subscribe(() => this._hostRecordsClient.performHost(this._editUserComponent.user.Username));
  }
}
