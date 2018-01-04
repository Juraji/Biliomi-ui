import {Component, Optional} from "@angular/core";
import {EditUserModalComponent} from "../EditUserModal.component";
import {RestTableDataSource} from "../../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {AchievementRecordsClient} from "../../../../../../shared/modules/biliomi/clients/model/AchievementRecords.client";
import {ConfirmDialogService} from "../../../../../../shared/modules/confirm-dialog/services/ConfirmDialog.service";
import IAchievementRecord = Biliomi.IAchievementRecord;

@Component({
  selector: "user-achievements",
  templateUrl: require("./UserAchievements.template.pug")
})
export class UserAchievementsComponent {
  private _parentModal: EditUserModalComponent;
  private _dialog: ConfirmDialogService;
  private dataSource: RestTableDataSource<IAchievementRecord> = new RestTableDataSource<IAchievementRecord>();

  constructor(@Optional() parentModal: EditUserModalComponent,
              achievementRecordsClient: AchievementRecordsClient,
              dialog: ConfirmDialogService) {
    this._parentModal = parentModal;
    this._dialog = dialog;
    this.dataSource.client = achievementRecordsClient;
    this.dataSource.clientParams
      .set("filter", "User.Id = " + parentModal.editedUser.Id);

    this._parentModal.onRefresh.subscribe(() => this.dataSource.update());
  }

  public deleteRecord(record: IAchievementRecord) {
    this._dialog.confirm(`Are you sure you want to delete the achievement "${record.Achievement}" for ${record.User.DisplayName}`)
      .filter((doDelete: boolean) => doDelete)
      .subscribe(async () => {
        let success: boolean = await this.dataSource.client.delete(record.Id);
        if (success) {
          this.dataSource.update();
        }
      });
  }
}
