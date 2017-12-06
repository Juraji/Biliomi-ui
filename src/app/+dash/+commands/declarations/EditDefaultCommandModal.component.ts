import {AfterViewInit, Component, Inject, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, MatSnackBar} from "@angular/material";
import {CommandsClient} from "../../../shared/modules/biliomi/clients/model/Commands.client";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import {UserGroupSelectComponent} from "../../../shared/components/UserGroupSelect.component";
import ICommand = Biliomi.ICommand;

@Component({
  selector: "edit-default-command-modal-component",
  templateUrl: require("./EditDefaultCommandModal.template.pug")
})
export class EditDefaultCommandModalComponent implements AfterViewInit {
  private _dialogRef: MatDialogRef<EditDefaultCommandModalComponent>;
  private _commandsClient: CommandsClient;
  private _commandId: number;
  private _matSnackBar: MatSnackBar;

  private editedCommand: ICommand;
  private commandCooldownControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private commandPriceControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private moderatorCanAlwaysActivateControl: FormControl = new FormControl(true);
  private commandAliasses: string[] = [];

  @ViewChild("userGroup", {read: UserGroupSelectComponent})
  private userGroupSelect: UserGroupSelectComponent;

  constructor(@Inject(MAT_DIALOG_DATA) commandId: number,
              commandsClient: CommandsClient,
              dialogRef: MatDialogRef<EditDefaultCommandModalComponent>,
              matSnackBar: MatSnackBar) {
    this._commandId = commandId;
    this._commandsClient = commandsClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;
  }

  public async ngAfterViewInit() {
    this.editedCommand = await this._commandsClient.get(this._commandId);
    this.initFields();
  }

  private initFields() {
    this.commandCooldownControl.setValue(this.editedCommand.Cooldown);
    this.commandPriceControl.setValue(this.editedCommand.Price);
    this.moderatorCanAlwaysActivateControl.setValue(this.editedCommand.ModeratorCanAlwaysActivate);
    this.userGroupSelect.selectedGroup = this.editedCommand.UserGroup;
    this.commandAliasses.length = 0;
    this.commandAliasses.push(...this.editedCommand.Aliasses)
  }

  private get isFormOk(): boolean {
    return this.commandCooldownControl.valid
      && this.commandPriceControl.valid;
  }

  private async save() {
    if (this.isFormOk) {
      let command: ICommand = {} as ICommand;
      let persistedCommand: ICommand;

      Object.assign(command, this.editedCommand);
      command.Cooldown = this.commandCooldownControl.value;
      command.Price = this.commandPriceControl.value;
      command.Aliasses = this.commandAliasses;
      command.UserGroup = this.userGroupSelect.selectedGroup;
      command.ModeratorCanAlwaysActivate = this.moderatorCanAlwaysActivateControl.value;

      persistedCommand = await this._commandsClient.put(this._commandId, command);
      if (persistedCommand == null) {
        this._matSnackBar.open("Could not save !" + this.editedCommand.Command + ", check your input.", "Ok");
      } else {
        this._dialogRef.close(true);
      }
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
