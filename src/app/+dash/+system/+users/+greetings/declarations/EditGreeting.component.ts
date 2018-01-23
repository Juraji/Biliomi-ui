import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {UserGreetingsClient} from "../../../../../shared/modules/biliomi/clients/model/UserGreetings.client";
import {DialogsService} from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import {FormControl, Validators} from "@angular/forms";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IUserGreeting = Biliomi.IUserGreeting;

@Component({
  selector: "edit-greeting",
  templateUrl: require("./EditGreeting.template.pug")
})
export class EditGreetingComponent implements OnInit {
  private _dialogRef: MatDialogRef<EditGreetingComponent>;
  private _greetingsClient: UserGreetingsClient;
  private _dialogs: DialogsService;
  private _snackbar: MatSnackBar;
  private _greetingId: number;

  public editedGreeting: IUserGreeting;
  public greetingControl: FormControl = new FormControl("", [Validators.required]);

  public get isFormOk(): boolean {
    return this.greetingControl.valid;
  }

  constructor(@Inject(MAT_DIALOG_DATA) greetingId: number,
              dialogRef: MatDialogRef<EditGreetingComponent>,
              greetingsClient: UserGreetingsClient,
              snackbar: MatSnackBar,
              dialogs: DialogsService) {
    this._greetingsClient = greetingsClient;
    this._greetingId = greetingId;
    this._dialogRef = dialogRef;
    this._snackbar = snackbar;
    this._dialogs = dialogs;
  }

  public async ngOnInit() {
    this.editedGreeting = await this._greetingsClient.get(this._greetingId);
    this.initFields();
  }

  public initFields() {
    this.greetingControl.reset(this.editedGreeting.Message);
  }

  public async save() {
    if (this.isFormOk) {
      let greeting: IUserGreeting = {...this.editedGreeting};
      let persistedGreeting: IUserGreeting;

      greeting.Message = this.greetingControl.value;
      persistedGreeting = await this._greetingsClient.put(this._greetingId, greeting);

      if (persistedGreeting == null) {
        this._snackbar.open(`Could not save the greeting for ${this.editedGreeting.User.DisplayName}, check your input`, "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  public deleteGreeting() {
    this._dialogs.confirm(`Are you sure you want to delete the greeting for ${this.editedGreeting.User.DisplayName}?`)
      .filter((confirmed: boolean) => confirmed)
      .subscribe(async () => {
        let success: boolean = await this._greetingsClient.delete(this._greetingId);
        if (success) {
          this._dialogRef.close(true);
        } else {
          this._snackbar.open(`Failed to delete the greeting for ${this.editedGreeting.User.DisplayName}, does it still exist?`, "Ok");
        }
      });
  }

  public cancelEdit() {
    this._dialogRef.close(false);
  }
}