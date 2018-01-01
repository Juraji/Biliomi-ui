import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: "voice-command-confirm",
  templateUrl: require("./VoiceCommandConfirm.template.pug")
})
export class VoiceCommandConfirmComponent {
  private _dialogRef: MatDialogRef<any>;
  public message: string;

  constructor(@Inject(MAT_DIALOG_DATA) message: string, dialogRef: MatDialogRef<any>) {
    this.message = message;
    this._dialogRef = dialogRef;
  }

  public confirmCommand() {
    this._dialogRef.close(true);
  }

  public cancelCommand() {
    this._dialogRef.close(false);
  }
}
