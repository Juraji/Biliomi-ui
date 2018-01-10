import {AfterViewInit, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, MatSnackBar} from "@angular/material";
import {CommandsClient} from "../../../../shared/modules/biliomi/clients/model/Commands.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import ICommand = Biliomi.ICommand;
import IUserGroup = Biliomi.IUserGroup;

@Component({
  selector: "edit-default-command-modal-component",
  templateUrl: require("./EditSystemCommandModal.template.pug")
})
export class EditSystemCommandModalComponent implements AfterViewInit {
  private _dialogRef: MatDialogRef<EditSystemCommandModalComponent>;
  private _commandsClient: CommandsClient;
  private _commandId: number;
  private _matSnackBar: MatSnackBar;

  public editedCommand: ICommand;
  public commandCooldownControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public commandPriceControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public moderatorCanAlwaysActivateControl: FormControl = new FormControl(true);
  public commandAliasses: string[] = [];
  public userGroup: IUserGroup;

  constructor(@Inject(MAT_DIALOG_DATA) commandId: number,
              commandsClient: CommandsClient,
              dialogRef: MatDialogRef<EditSystemCommandModalComponent>,
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

  public initFields() {
    this.commandCooldownControl.setValue(this.editedCommand.Cooldown);
    this.commandPriceControl.setValue(this.editedCommand.Price);
    this.moderatorCanAlwaysActivateControl.setValue(this.editedCommand.ModeratorCanAlwaysActivate);
    this.userGroup = this.editedCommand.UserGroup;
    this.commandAliasses.length = 0;
    this.commandAliasses.push(...this.editedCommand.Aliasses);
  }

  public get isFormOk(): boolean {
    return this.commandCooldownControl.valid
      && this.commandPriceControl.valid;
  }

  public async save() {
    if (this.isFormOk) {
      let command: ICommand = {...this.editedCommand};
      let persistedCommand: ICommand;

      command.Cooldown = this.commandCooldownControl.value;
      command.Price = this.commandPriceControl.value;
      command.Aliasses = this.commandAliasses;
      command.UserGroup = this.userGroup;
      command.ModeratorCanAlwaysActivate = this.moderatorCanAlwaysActivateControl.value;

      persistedCommand = await this._commandsClient.put(this._commandId, command);
      if (persistedCommand == null) {
        this._matSnackBar.open("Could not save !" + this.editedCommand.Command + ", check your input.", "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  public cancelEdit() {
    this._dialogRef.close(false);
  }

  public addedAliasChip(event: MatChipInputEvent) {
    let value: string = (event.value || "").trim();
    if (value) {
      this.commandAliasses.push(value);
    }

    if (event.input) {
      event.input.value = "";
    }
  }

  public removedAliasChip(alias: string) {
    let index: number = this.commandAliasses.indexOf(alias);

    if (index > -1) {
      this.commandAliasses.splice(index, 1);
    }
  }
}
