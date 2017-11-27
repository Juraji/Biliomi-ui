import {AfterViewInit, Component, Inject, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {CustomCommandsClient} from "../../../shared/modules/biliomi/clients/model/CustomCommands.client";
import {FormControl, Validators} from "@angular/forms";
import {UserGroupSelectComponent} from "../../../shared/components/UserGroupSelect.component";
import {ConfirmDialogComponent} from "../../../shared/components/ConfirmDialog.component";
import ICustomCommand = Biliomi.ICustomCommand;

@Component({
  selector: "edit-custom-command-modal-component",
  templateUrl: require("./EditCustomCommandModal.template.pug")
})
export class EditCustomCommandModalComponent implements AfterViewInit {
  private _dialogRef: MatDialogRef<EditCustomCommandModalComponent>;
  private _customCommandsClient: CustomCommandsClient;
  private _commandId: number;
  private _matSnackBar: MatSnackBar;
  private _dialog: MatDialog;

  private editedCommand: ICustomCommand;
  private commandCommandControl: FormControl = new FormControl('', [Validators.required]);
  private commandMessageControl: FormControl = new FormControl('', [Validators.required]);
  private commandCooldownControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private commandPriceControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private commandAliasses: string[] = [];

  @ViewChild("userGroup", {read: UserGroupSelectComponent})
  private userGroupSelect: UserGroupSelectComponent;

  constructor(@Inject(MAT_DIALOG_DATA) commandId: number,
              customCommandsClient: CustomCommandsClient,
              dialogRef: MatDialogRef<EditCustomCommandModalComponent>,
              matSnackBar: MatSnackBar,
              dialog: MatDialog) {
    this._customCommandsClient = customCommandsClient;
    this._dialogRef = dialogRef;
    this._commandId = commandId;
    this._matSnackBar = matSnackBar;
    this._dialog = dialog;
  }

  public async ngAfterViewInit() {
    if (this._commandId != null) {
      this.editedCommand = await this._customCommandsClient.get(this._commandId);
    }
    this.initFields();
  }

  private initFields() {
    if (this.editedCommand == null) {
      // No command was loaded, initialize a new Command
      this.editedCommand = {} as ICustomCommand;
      this.editedCommand.Message = '';
      this.editedCommand.Cooldown = 0;
      this.editedCommand.Price = 0;
      this.editedCommand.UserGroup = this.userGroupSelect.selectedGroup;
      this.editedCommand.Aliasses = [];
    }

    this.commandCommandControl.setValue(this.editedCommand.Command);
    this.commandMessageControl.setValue(this.editedCommand.Message);
    this.commandCooldownControl.setValue(this.editedCommand.Cooldown);
    this.commandPriceControl.setValue(this.editedCommand.Price);
    this.userGroupSelect.selectedGroup = this.editedCommand.UserGroup;
    this.commandAliasses.length = 0;
    this.commandAliasses.push(...this.editedCommand.Aliasses)
  }

  private get isFormOk(): boolean {
    return this.commandCommandControl.valid
      && this.commandMessageControl.valid
      && this.commandCooldownControl.valid
      && this.commandPriceControl.valid;
  }

  private async save() {
    if (this.isFormOk) {
      let command: ICustomCommand = Object.create(this.editedCommand);
      let persistedCommand: ICustomCommand;

      command.Command = this.commandCommandControl.value;
      command.Message = this.commandMessageControl.value;
      command.Cooldown = this.commandCooldownControl.value;
      command.Price = this.commandPriceControl.value;
      command.Aliasses = this.commandAliasses;
      command.UserGroup = this.userGroupSelect.selectedGroup;

      if (this._commandId == null) {
        persistedCommand = await this._customCommandsClient.post(command);
      } else {
        persistedCommand = await this._customCommandsClient.put(this._commandId, command);
      }

      if (persistedCommand == null) {
        this._matSnackBar.open("Could not save !" + this.editedCommand.Command + ", check your input.", "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  private deleteCommand() {
    if (this._commandId != null) {
      this._dialog.open(ConfirmDialogComponent, {
        data: "Are you sure you want to delete !" + this.editedCommand.Command + "?"
      }).afterClosed().subscribe(async (confirmed: boolean) => {
        if (confirmed) {
          let success: boolean = await this._customCommandsClient.delete(this._commandId);
          if (success == null) {
            this._matSnackBar.open("Could not delete !" + this.editedCommand.Command + ", does it still exist?", "Ok");
          } else {
            this._dialogRef.close(true);
          }
        }
      });
    }
  }

  private cancelEdit() {
    this._dialogRef.close(false);
  }

  private addedAliasChip(event: MatChipInputEvent) {
    let value: string = (event.value || "").trim();
    if (value) {
      this.commandAliasses.push(value);
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  private removedAliasChip(alias: string) {
    let index: number = this.commandAliasses.indexOf(alias);

    if (index > -1) {
      this.commandAliasses.splice(index, 1);
    }
  }
}
