import {Component, Input} from "@angular/core";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {BiliomiApiService} from "../modules/biliomi/services/BiliomiApi.service";
import {FormControl, Validators} from "@angular/forms";
import {AllowTouchedFieldMatcher} from "../modules/ng-material/classes/AllowTouchedFieldMatcher";
import {ErrorStateMatcher} from "@angular/material";
import ICommand = Biliomi.ICommand;

@Component({
  selector: "command-form",
  templateUrl: require("./CommandForm.template.pug"),
  styleUrls: [require("./CommandForm.less").toString()]
})
export class CommandFormComponent {
  private _api: BiliomiApiService;
  private argFormControl = new FormControl('', [Validators.required]);
  private argFieldMatcher: ErrorStateMatcher = new AllowTouchedFieldMatcher();

  @Input("command")
  private command: ICommand;

  @Input("placeholder")
  private placeholder: string = "Arguments...";

  @Input("argsDisabled")
  private set argsDisabled(disabled: boolean) {
    this.argFormControl.reset({value: '', disabled: disabled});
  }

  @Input("argsRequired")
  private argsRequired: boolean = true;

  @Input("helpText")
  private helpText: string = null;

  constructor(api: BiliomiApiService) {
    this._api = api;
  }

  private async executeCommand() {
    if (this.argsRequired && this.argFormControl.invalid) {
      return;
    }

    let success = await this._api.postCommand(this.command.Command, this.argFormControl.value);
    if (success) {
      this.argFormControl.reset();
    } else {
      this.argFormControl.setErrors({failed: true});
    }
  }
}
