import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: "confirm-dialog-component",
  templateUrl: require("./ConfirmDialog.template.pug")
})
export class ConfirmDialogComponent {
  private message: string;
  private _dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) message: string, dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this.message = message;
    this._dialogRef = dialogRef;
  }

  public onYes() {
    this._dialogRef.close(true);
  }

  public onNo() {
    this._dialogRef.close(false);
  }
}
