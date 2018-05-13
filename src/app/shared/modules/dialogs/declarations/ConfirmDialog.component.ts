import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: "confirm-modal",
    templateUrl: require("./ConfirmDialog.template.html")
})
export class ConfirmDialogComponent {
    private _dialogRef: MatDialogRef<ConfirmDialogComponent>;

    constructor(@Inject(MAT_DIALOG_DATA) dialogData: IConfirmDialogData,
                dialogRef: MatDialogRef<ConfirmDialogComponent>) {
        this._dialogData = dialogData;
        this._dialogRef = dialogRef;
    }

    private _dialogData: IConfirmDialogData;

    public get dialogData(): IConfirmDialogData {
        return this._dialogData;
    }

    public confirm() {
        this._dialogRef.close(true);
    }

    public cancel() {
        this._dialogRef.close(false);
    }
}
