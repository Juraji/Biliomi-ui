import { AfterViewInit, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { Biliomi } from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { CustomCommandsClient } from "../../../../shared/modules/biliomi/clients/model/CustomCommands.client";
import { FormControl, Validators } from "@angular/forms";
import { DialogsService } from "../../../../shared/modules/dialogs/services/Dialogs.service";
import ICustomCommand = Biliomi.ICustomCommand;
import IUserGroup = Biliomi.IUserGroup;

@Component({
    selector: "edit-custom-command-modal-component",
    templateUrl: require("./EditCustomCommandModal.template.html")
})
export class EditCustomCommandModalComponent implements AfterViewInit {
    public editedCommand: ICustomCommand;
    public commandCommandControl: FormControl = new FormControl("", [Validators.required]);
    public commandMessageControl: FormControl = new FormControl("", [Validators.required]);
    public commandCooldownControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
    public commandPriceControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
    public userGroup: IUserGroup;
    public commandAliases: string[];
    private _dialogRef: MatDialogRef<EditCustomCommandModalComponent>;
    private _customCommandsClient: CustomCommandsClient;
    private _commandId: number;
    private _matSnackBar: MatSnackBar;
    private _dialog: DialogsService;

    constructor(@Inject(MAT_DIALOG_DATA) commandId: number,
                customCommandsClient: CustomCommandsClient,
                dialogRef: MatDialogRef<EditCustomCommandModalComponent>,
                matSnackBar: MatSnackBar,
                dialog: DialogsService) {
        this._customCommandsClient = customCommandsClient;
        this._dialogRef = dialogRef;
        this._commandId = commandId;
        this._matSnackBar = matSnackBar;
        this._dialog = dialog;
    }

    public get isFormOk(): boolean {
        return this.commandCommandControl.valid
            && this.commandMessageControl.valid
            && this.commandCooldownControl.valid
            && this.commandPriceControl.valid;
    }

    public async ngAfterViewInit() {
        if (this._commandId != null) {
            this.editedCommand = await this._customCommandsClient.get(this._commandId);
        }
        this.initFields();
    }

    public initFields() {
        if (this.editedCommand == null) {
            // No command was loaded, initialize a new Command
            this.editedCommand = {} as ICustomCommand;
            this.editedCommand.Message = "";
            this.editedCommand.Cooldown = 0;
            this.editedCommand.Price = 0;
            this.editedCommand.UserGroup = this.userGroup;
            this.editedCommand.Aliasses = [];
        }

        this.commandCommandControl.reset(this.editedCommand.Command);
        this.commandMessageControl.reset(this.editedCommand.Message);
        this.commandCooldownControl.reset(this.editedCommand.Cooldown);
        this.commandPriceControl.reset(this.editedCommand.Price);
        this.userGroup = this.editedCommand.UserGroup;
        this.commandAliases = this.editedCommand.Aliasses;
    }

    public async save() {
        if (this.isFormOk) {
            let command: ICustomCommand = {...this.editedCommand};
            let persistedCommand: ICustomCommand;

            command.Command = this.commandCommandControl.value;
            command.Message = this.commandMessageControl.value;
            command.Cooldown = this.commandCooldownControl.value;
            command.Price = this.commandPriceControl.value;
            command.Aliasses = this.commandAliases;
            command.UserGroup = this.userGroup;

            if (this._commandId == null) {
                persistedCommand = await this._customCommandsClient.post(command);
            } else {
                persistedCommand = await this._customCommandsClient.put(this._commandId, command);
            }

            if (persistedCommand == null) {
                this._matSnackBar.open(`Could not save !${this.editedCommand.Command}, check your input.`, "Ok");
            } else {
                this._dialogRef.close(true);
            }
        }
    }

    public async deleteCommand() {
        if (this._commandId != null) {
            let confirmed = await this._dialog.confirm(`Are you sure you want to delete !${this.editedCommand.Command}?`);
            if (confirmed) {
                let success: boolean = await this._customCommandsClient.delete(this._commandId);
                if (success == null) {
                    this._matSnackBar.open(`Could not delete !${this.editedCommand.Command}, does it still exist?`, "Ok");
                } else {
                    this._dialogRef.close(true);
                }
            }
        }
    }

    public cancelEdit() {
        this._dialogRef.close(false);
    }
}
