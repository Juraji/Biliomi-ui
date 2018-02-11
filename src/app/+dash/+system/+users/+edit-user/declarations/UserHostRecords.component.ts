import {Component, Optional} from "@angular/core";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {HostRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {DialogsService} from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import {EditUserComponent} from "../EditUser.component";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IHostRecord = Biliomi.IHostRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-host-records",
  templateUrl: require("./UserHostRecords.template.html")
})
export class UserHostRecordsComponent {
  private _editUserComponent: EditUserComponent;
  private _hostRecordsClient: HostRecordsClient;
  private _dialog: DialogsService;

  public dataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              hostRecordsClient: HostRecordsClient,
              dialog: DialogsService) {
    this._editUserComponent = editUserComponent;
    this._hostRecordsClient = hostRecordsClient;
    this._dialog = dialog;

    this.dataSource.client = hostRecordsClient;
    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("user.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
        .toString());
    }
  }

  public async hostUser() {
    let confirmed = await this._dialog.confirm(`Are you sure you want to host ${this._editUserComponent.user.DisplayName}?`);
    if (confirmed) {
      this._hostRecordsClient.performHost(this._editUserComponent.user.Username);
    }
  }
}
