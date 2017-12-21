import {Component, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {ChatModeratorSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/ChatModeratorSettings.client";

@Component({
  selector: "caps-and-repeated-characters-settings",
  templateUrl: require("./CapsAndRepeatedCharactersSettings.template.pug")
})
export class CapsAndRepeatedCharactersSettingsComponent implements OnInit {
  private _chatModeratorSettingsClient: ChatModeratorSettingsClient;

  public excessiveCapsAllowedControl: FormControl = new FormControl(false);
  public capsTriggerControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public capsTriggerRatioControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]);

  public repeatedCharactersAllowedControl: FormControl = new FormControl();
  public repeatedCharacterTriggerControl: FormControl = new FormControl(5, [Validators.required, Validators.min(5)]);

  constructor(chatModeratorSettingsClient: ChatModeratorSettingsClient) {
    this._chatModeratorSettingsClient = chatModeratorSettingsClient;
  }

  public async ngOnInit() {
    await this._chatModeratorSettingsClient.load(true);

    this.excessiveCapsAllowedControl.setValue(this._chatModeratorSettingsClient.ExcessiveCapsAllowed);
    this.capsTriggerControl.setValue(this._chatModeratorSettingsClient.CapsTrigger);
    this.capsTriggerRatioControl.setValue(this._chatModeratorSettingsClient.CapsTriggerRatio * 100);

    this.repeatedCharactersAllowedControl.setValue(this._chatModeratorSettingsClient.RepeatedCharactersAllowed);
    this.repeatedCharacterTriggerControl.setValue(this._chatModeratorSettingsClient.RepeatedCharacterTrigger);
  }

  public get isFormOk(): boolean {
    return (this.excessiveCapsAllowedControl.value || (this.capsTriggerControl.valid && this.capsTriggerRatioControl.valid))
      && (this.repeatedCharactersAllowedControl.value || this.repeatedCharacterTriggerControl.valid);
  }

  public saveSettings() {
    if (this.isFormOk) {
      this._chatModeratorSettingsClient.ExcessiveCapsAllowed = this.excessiveCapsAllowedControl.value;
      this._chatModeratorSettingsClient.CapsTrigger = this.capsTriggerControl.value;
      this._chatModeratorSettingsClient.CapsTriggerRatio = this.capsTriggerRatioControl.value / 100;
      this._chatModeratorSettingsClient.RepeatedCharactersAllowed = this.repeatedCharactersAllowedControl.value;
      this._chatModeratorSettingsClient.RepeatedCharacterTrigger = this.repeatedCharacterTriggerControl.value;
      this._chatModeratorSettingsClient.save();
    }
  }
}