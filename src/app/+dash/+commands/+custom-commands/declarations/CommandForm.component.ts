import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../../../shared/modules/biliomi/services/BiliomiApi.service";
import {ARG_COMMAND_REPLACEMENTS} from "../../../../shared/modules/biliomi/classes/constants/CommandReplacements";
import {FormControl, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material";
import {AllowTouchedFieldMatcher} from "../../../../shared/modules/ng-material/classes/AllowTouchedFieldMatcher";

import "./CommandForm.less";
import ICustomCommand = Biliomi.ICustomCommand;

@Component({
  selector: "command-form",
  templateUrl: require("./CommandForm.template.html")
})
export class CommandFormComponent implements OnInit {
  private _api: BiliomiApiService;
  private _command: ICustomCommand;
  private _commandHasArgs: boolean;

  public commandArgsControl: FormControl = new FormControl("", [Validators.required]);
  public commandArgsControlMatcher: ErrorStateMatcher = new AllowTouchedFieldMatcher();

  @Input("command")
  public get command(): ICustomCommand {
    return this._command;
  }

  public set command(command: ICustomCommand) {
    this._command = command;
  }

  @HostBinding("class.has-args")
  public get commandHasArgs(): boolean {
    return this._commandHasArgs;
  }

  constructor(api: BiliomiApiService) {
    this._api = api;
  }

  public ngOnInit() {
    this._commandHasArgs = Object.keys(ARG_COMMAND_REPLACEMENTS)
      .some((repl: string) => this._command.Message.indexOf(repl) > -1);
  }

  public async executeCommand() {
    let success = false;

    if (this.commandArgsControl.valid) {
      success = await this._api.postCommand(this._command.Command, this.commandArgsControl.value);

      if (success) {
        this.commandArgsControl.reset("");
      } else {
        this.commandArgsControl.setErrors({failed: true});
      }
    }

    return success;
  }

  public async executeCommandNoArgs() {
    return this._api.postCommand(this._command.Command);
  }
}
