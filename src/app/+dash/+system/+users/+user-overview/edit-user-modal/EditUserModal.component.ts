import {Component, EventEmitter, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {UsersClient} from "../../../../../shared/modules/biliomi/clients/model/Users.client";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IUser = Biliomi.IUser;

@Component({
  selector: "edit-user-modal-component",
  templateUrl: require("./EditUserModal.template.pug")
})
export class EditUserModalComponent implements OnInit {
  private _dialogRef: MatDialogRef<EditUserModalComponent>;
  private _usersClient: UsersClient;
  private _matSnackBar: MatSnackBar;
  private _userId: number;
  private _editedUser: IUser;
  private _modalFormOk: boolean = true;
  private _onSave: EventEmitter<void> = new EventEmitter<void>();
  private _onRefresh: EventEmitter<void> = new EventEmitter<void>();

  public get editedUser(): IUser {
    return this._editedUser;
  }

  public get modalFormOk(): boolean {
    return this._modalFormOk;
  }

  public set modalFormOk(formOk: boolean) {
    this._modalFormOk = formOk;
  }

  public get onRefresh(): EventEmitter<void> {
    return this._onRefresh;
  }

  public get onSave(): EventEmitter<void> {
    return this._onSave;
  }

  constructor(@Inject(MAT_DIALOG_DATA) userId: number,
              usersClient: UsersClient,
              dialogRef: MatDialogRef<EditUserModalComponent>,
              matSnackBar: MatSnackBar) {
    this._userId = userId;
    this._usersClient = usersClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;
  }

  public ngOnInit() {
    this.refreshForms();
  }

  public saveForms() {
    this._onSave.emit();
  }

  public async refreshForms() {
    this._editedUser = await this._usersClient.get(this._userId);
    this._onRefresh.emit();
  }

  public close(changesMade: boolean) {
    this._dialogRef.close(changesMade);
  }
}
