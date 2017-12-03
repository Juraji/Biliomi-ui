import {AfterViewInit, Component, Inject, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {UsersClient} from "../../../../shared/modules/biliomi/clients/model/Users.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import {UserGroupSelectComponent} from "../../../../shared/components/UserGroupSelect.component";
import * as moment from "moment";
import IUser = Biliomi.IUser;

@Component({
  selector: "edit-user-modal-component",
  templateUrl: require("./EditUserModal.template.pug")
})
export class EditUserModalComponent implements AfterViewInit {
  private _dialogRef: MatDialogRef<EditUserModalComponent>;
  private _usersClient: UsersClient;
  private _matSnackBar: MatSnackBar;
  private _userId: number;

  private editedUser: IUser;
  private userTitleControl: FormControl = new FormControl('');
  private userPointsControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private userIsBlacklistedControl: FormControl = new FormControl(false);

  @ViewChild("userGroup", {read: UserGroupSelectComponent})
  private userGroupSelect: UserGroupSelectComponent;

  constructor(@Inject(MAT_DIALOG_DATA) userId: number,
              usersClient: UsersClient,
              dialogRef: MatDialogRef<EditUserModalComponent>,
              matSnackBar: MatSnackBar) {
    this._userId = userId;
    this._usersClient = usersClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;
  }

  public async ngAfterViewInit() {
    this.editedUser = await this._usersClient.get(this._userId);
    this.initFields();
  }

  private initFields() {
    this.userTitleControl.setValue(this.editedUser.Title);
    this.userPointsControl.setValue(this.editedUser.Points);
    this.userIsBlacklistedControl.setValue(this.editedUser.BlacklistedSince != null);
    this.userGroupSelect.selectedGroup = this.editedUser.UserGroup;
  }

  private get isFormOk(): boolean {
    return this.userPointsControl.valid;
  }

  private async save() {
    if (this.isFormOk) {
      let user: IUser = {} as IUser;
      let persistedUser: IUser;

      Object.assign(user, this.editedUser);
      user.Title = this.userTitleControl.value;
      user.Points = this.userPointsControl.value;
      user.UserGroup = this.userGroupSelect.selectedGroup;

      if (this.userIsBlacklistedControl.value === true && this.editedUser.BlacklistedSince == null) {
        this.editedUser.BlacklistedSince = moment().format();
      } else if (this.userIsBlacklistedControl.value === false) {
        this.editedUser.BlacklistedSince = null;
      }

      user.BlacklistedSince =  this.editedUser.BlacklistedSince;

      persistedUser = await this._usersClient.put(this._userId, user);
      if (persistedUser == null) {
        this._matSnackBar.open("Could not save " + this.editedUser.DisplayName + ", check your input.", "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  private cancelEdit() {
    this._dialogRef.close(false);
  }
}
