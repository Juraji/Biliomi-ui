import {Component, Input, ViewChild} from "@angular/core";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {BiliomiApiService} from "../modules/biliomi/services/BiliomiApi.service";
import {FormControl, Validators} from "@angular/forms";
import {AllowTouchedFieldMatcher} from "../modules/ng-material/classes/AllowTouchedFieldMatcher";
import {ErrorStateMatcher} from "@angular/material";
import {SaveButtonComponent} from "./SaveButton.component";
import ICommand = Biliomi.ICommand;

import "./CommandForm.less";

@Component({
  selector: "command-form",
  templateUrl: require("./CommandForm.template.pug")
})
export class CommandFormComponent {
  private _api: BiliomiApiService;
  public argFormControl = new FormControl("", [Validators.required]);
  public argFieldMatcher: ErrorStateMatcher = new AllowTouchedFieldMatcher();

  @Input("command")
  public command: ICommand;

  @Input("placeholder")
  public placeholder: string = "Arguments...";

  @Input("argsDisabled")
  public set argsDisabled(disabled: boolean) {
    this.argFormControl.reset({value: "", disabled: disabled});
  }

  @Input("argsRequired")
  public argsRequired: boolean = true;

  @Input("helpText")
  public helpText: string = null;

  @ViewChild(SaveButtonComponent)
  public saveButton: SaveButtonComponent;

  constructor(api: BiliomiApiService) {
    this._api = api;
  }

  public async executeCommand() {
    if (this.argsRequired && this.argFormControl.invalid) {
      return;
    }

    let success = await this._api.postCommand(this.command.Command, this.argFormControl.value);
    this.saveButton.state = success;
    if (success) {
      this.argFormControl.reset();
    } else {
      this.argFormControl.setErrors({failed: true});
    }
  }
}
