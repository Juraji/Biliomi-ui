import {Component, Optional} from "@angular/core";
import {EditUserModalComponent} from "../EditUserModal.component";
import {HostRecordsClient} from "../../../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {RestTableDataSource} from "../../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {ConfirmDialogService} from "../../../../../../shared/modules/confirm-dialog/services/ConfirmDialog.service";
import IHostRecord = Biliomi.IHostRecord;

@Component({
  selector: "user-host-records",
  templateUrl: require("./UserHostRecords.template.pug")
})
export class UserHostRecordsComponent {
  private _parentModal: EditUserModalComponent;
  private _dialog: ConfirmDialogService;
  public dataSource: RestTableDataSource<IHostRecord> = new RestTableDataSource<IHostRecord>();

  constructor(@Optional() parentModal: EditUserModalComponent,
              hostRecordsClient: HostRecordsClient,
              dialog: ConfirmDialogService) {
    this._parentModal = parentModal;
    this._dialog = dialog;
    this.dataSource.client = hostRecordsClient;
    this.dataSource.clientParams
      .set("filter", "User.Id = " + parentModal.editedUser.Id);

    this._parentModal.onRefresh.subscribe(() => this.dataSource.update());
  }

  public deleteRecord(record: IHostRecord) {
    this._dialog.confirm(`Are you sure you want to delete this host record for ${record.User.DisplayName}`)
      .filter((doDelete: boolean) => doDelete)
      .subscribe(async () => {
        let success: boolean = await this.dataSource.client.delete(record.Id);
        if (success) {
          this.dataSource.update();
        }
      });
  }
}
