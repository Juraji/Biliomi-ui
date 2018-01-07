import {AfterViewInit, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import {UserGroupsClient} from "../../../../../shared/modules/biliomi/clients/model/UserGroups.client";
import IUserGroup = Biliomi.IUserGroup;

@Component({
  selector: "edit-user-group-modal",
  templateUrl: require("./EditUserGroupModal.template.pug")
})
export class EditUserGroupModalComponent implements AfterViewInit {
  private _groupId: number;
  private _userGroupsClient: UserGroupsClient;
  private _dialogRef: MatDialogRef<EditUserGroupModalComponent>;
  private _matSnackBar: MatSnackBar;

  private editedGroup: IUserGroup;
  private groupNameControl: FormControl = new FormControl("", [Validators.required, Validators.pattern(/^[a-z]+$/i)]);
  private weightControl: FormControl = new FormControl(1000, [Validators.required, Validators.min(10), Validators.max(1000)]);
  private levelUpHoursControl: FormControl = new FormControl(null, [Validators.min(0)]);

  constructor(@Inject(MAT_DIALOG_DATA) groupId: number,
              userGroupsClient: UserGroupsClient,
              dialogRef: MatDialogRef<EditUserGroupModalComponent>,
              matSnackBar: MatSnackBar) {
    this._groupId = groupId;
    this._userGroupsClient = userGroupsClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;
  }

  public async ngAfterViewInit() {
    if (this._groupId != null) {
      this.editedGroup = await this._userGroupsClient.get(this._groupId);
      this.initFields();
    } else {
      this.editedGroup = {Weight: 10} as IUserGroup;
    }
  }

  public initFields() {
    this.groupNameControl.setValue(this.editedGroup.Name);
    this.weightControl.setValue(this.editedGroup.Weight);
    this.levelUpHoursControl.setValue(this.editedGroup.LevelUpHours);
  }

  public get isFormOk(): boolean {
    return this.groupNameControl.valid
      && (this.editedGroup.Weight < 10
        || (this.weightControl.valid
          && this.levelUpHoursControl.valid));
  }

  public async save() {
    if (this.isFormOk) {
      let group: IUserGroup = {} as IUserGroup;
      let persistedGroup: IUserGroup;

      Object.assign(group, this.editedGroup);
      group.Name = this.groupNameControl.value;
      group.Weight = this.weightControl.value;

      if (this.levelUpHoursControl.value === 0) {
        group.LevelUpHours = null;
      } else {
        group.LevelUpHours = this.levelUpHoursControl.value;
      }

      if (this._groupId == null) {
        persistedGroup = await this._userGroupsClient.post(group);
      } else {
        persistedGroup = await this._userGroupsClient.put(this._groupId, group);
      }

      if (persistedGroup == null) {
        this._matSnackBar.open("Could not save " + group.Name + ", check your input.", "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  public cancelEdit() {
    this._dialogRef.close(false);
  }
}
