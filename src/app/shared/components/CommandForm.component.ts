import {Component, Input, OnInit} from "@angular/core";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {BiliomiApiService} from "../modules/biliomi/services/BiliomiApi.service";
import {FormControl, Validators} from "@angular/forms";
import ICommand = Biliomi.ICommand;

@Component({
  selector: "command-form",
  templateUrl: require("./CommandForm.template.pug"),
  styleUrls: [require("./CommandForm.less").toString()]
})
export class CommandFormComponent implements OnInit {
  private _api: BiliomiApiService;
  private argFormControl = new FormControl('', [Validators.required]);

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
  public ngOnInit() {
    if (!this.argsRequired) {
      this.argFormControl.setValidators(null);
    }
  }

  private async executeCommand() {
    if (this.argFormControl.valid) {
      let success = await this._api.postCommand(this.command.Command, this.argFormControl.value);
      if (success) {
        this.argFormControl.reset();
      } else {
        this.argFormControl.setErrors({failed: true});
      }
    }
  }
}
