import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: "confirm-modal",
  templateUrl: require("./ConfirmDialog.template.pug")
})
export class ConfirmDialogComponent {
  private _dialogData: IDialogData;
  private _dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public get dialogData(): IDialogData {
    return this._dialogData;
  }

  constructor(@Inject(MAT_DIALOG_DATA) dialogData: IDialogData,
                dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this._dialogData = dialogData;
    this._dialogRef = dialogRef;
  }

  public confirm() {
    this._dialogRef.close(true);
  }

  public cancel() {
    this._dialogRef.close(false);
  }
}
