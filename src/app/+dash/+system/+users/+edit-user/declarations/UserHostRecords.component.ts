import {Component, Optional} from "@angular/core";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {HostRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {DialogsService} from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import {BiliomiApiService} from "../../../../../shared/modules/biliomi/services/BiliomiApi.service";
import {EditUserComponent} from "../EditUser.component";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IHostRecord = Biliomi.IHostRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-host-records",
  templateUrl: require("./UserHostRecords.template.pug")
})
export class UserHostRecordsComponent {
  private _editUserComponent: EditUserComponent;
  private _dialog: DialogsService;
  private _api: BiliomiApiService;

  public dataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              hostRecordsClient: HostRecordsClient,
              dialog: DialogsService,
              api: BiliomiApiService) {
    this._editUserComponent = editUserComponent;
    this._dialog = dialog;
    this._api = api;

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
      .subscribe(() => this._api.postCommand("host", this._editUserComponent.user.Username));
  }
}
