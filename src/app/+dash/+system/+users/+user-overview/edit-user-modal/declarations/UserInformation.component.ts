import {AfterViewInit, Component, Optional, ViewChild} from "@angular/core";
import {EditUserModalComponent} from "../EditUserModal.component";
import {UsersClient} from "../../../../../../shared/modules/biliomi/clients/model/Users.client";
import {MatSnackBar} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";
import {Biliomi} from "../../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {UserGroupSelectComponent} from "../../../../../../shared/components/UserGroupSelect.component";
import * as moment from "moment";
import IUser = Biliomi.IUser;

@Component({
  selector: "user-information",
  templateUrl: require("./UserInformation.template.pug")
})
export class UserInformationComponent implements AfterViewInit {
  private _parentModal: EditUserModalComponent;
  private _usersClient: UsersClient;
  private _matSnackBar: MatSnackBar;

  public editedUser: IUser;

  @ViewChild("userGroup", {read: UserGroupSelectComponent})
  public userGroupSelect: UserGroupSelectComponent;
  public userTitleControl: FormControl = new FormControl("");
  public userPointsControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public userRecordedTimeControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public userFollowDateControl: FormControl = new FormControl();
  public userSubscribeDateControl: FormControl = new FormControl();
  public userIsBlacklistedControl: FormControl = new FormControl(false);

  constructor(@Optional() parentModal: EditUserModalComponent,
              usersClient: UsersClient,
              matSnackBar: MatSnackBar) {
    this._parentModal = parentModal;
    this._usersClient = usersClient;
    this._matSnackBar = matSnackBar;

    this._parentModal.onSave.subscribe(() => this.save());
    this._parentModal.onRefresh.subscribe(() => this.initFields());

    this.userFollowDateControl.disable();
    this.userSubscribeDateControl.disable();
  }

  public ngAfterViewInit() {
    this.initFields();
  }

  public initFields() {
    this.editedUser = this._parentModal.editedUser;
    this.userTitleControl.setValue(this.editedUser.Title);
    this.userPointsControl.setValue(this.editedUser.Points);
    this.userRecordedTimeControl.setValue(this.editedUser.RecordedTime);
    this.userIsBlacklistedControl.setValue(this.editedUser.BlacklistedSince != null);
    this.userGroupSelect.selectedGroup = this.editedUser.UserGroup;

    if (this.editedUser.Follower) {
      this.userFollowDateControl.setValue(this.editedUser.FollowDate);
    }

    if (this.editedUser.Subscriber) {
      this.userSubscribeDateControl.setValue(this.editedUser.SubscribeDate);
    }
  }

  public get isFormOk(): boolean {
    return this.userPointsControl.valid
      && this.userRecordedTimeControl.valid;
  }

  public async save() {
    if (this.isFormOk) {
      let user: IUser = {} as IUser;
      let persistedUser: IUser;

      Object.assign(user, this.editedUser);
      user.Title = this.userTitleControl.value;
      user.Points = this.userPointsControl.value;
      user.RecordedTime = this.userRecordedTimeControl.value;
      user.UserGroup = this.userGroupSelect.selectedGroup;

      if (this.userIsBlacklistedControl.value === true && this.editedUser.BlacklistedSince == null) {
        user.BlacklistedSince = moment().format();
      } else if (this.userIsBlacklistedControl.value === false) {
        user.BlacklistedSince = null;
      }

      if (this.editedUser.Follower && this.editedUser.FollowDate !== this.userFollowDateControl.value.toString()) {
        user.FollowDate = this.userFollowDateControl.value;
      }

      if (this.editedUser.Subscriber && this.editedUser.SubscribeDate !== this.userSubscribeDateControl.value.toString()) {
        user.SubscribeDate = this.userSubscribeDateControl.value;
      }

      persistedUser = await this._usersClient.put(this.editedUser.Id, user);
      if (persistedUser == null) {
        this._matSnackBar.open("Could not save " + this.editedUser.DisplayName + ", check your input.", "Ok");
      } else {
        this._parentModal.close(true);
      }
    }
  }
}
