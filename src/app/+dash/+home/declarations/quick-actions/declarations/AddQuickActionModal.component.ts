import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { QuickActionType } from "../classes/interfaces/QuickAction.enum";
import { QuickAction } from "../classes/interfaces/QuickAction";

@Component({
    selector: "add-quick-action-modal",
    templateUrl: require("./AddQuickActionModal.template.html")
})
export class AddQuickActionModalComponent {
    public nameControl: FormControl = new FormControl("", [Validators.required]);
    public typeControl: FormControl = new FormControl(QuickActionType.COMMAND, [Validators.required]);
    public executeControl: FormControl = new FormControl("", [Validators.required]);
    private _dialogRef: MatDialogRef<AddQuickActionModalComponent>;

    constructor(dialogRef: MatDialogRef<AddQuickActionModalComponent>) {
        this._dialogRef = dialogRef;
    }

    public get isFormOk(): boolean {
        return this.nameControl.valid
            && this.typeControl.valid
            && this.executeControl.valid;
    }

    public saveAction() {
        if (this.isFormOk) {
            this._dialogRef.close({
                name: this.nameControl.value,
                type: this.typeControl.value,
                execute: this.executeControl.value
            } as QuickAction);
        }
    }

    public cancelEdit() {
        this._dialogRef.close(null);
    }
}
