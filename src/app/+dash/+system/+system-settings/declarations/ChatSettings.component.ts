import {Component, OnInit} from "@angular/core";
import {SystemSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/SystemSettings.client";
import {FormControl} from "@angular/forms";

@Component({
  selector: "chat-settings-component",
  templateUrl: require("./ChatSettings.template.pug")
})
export class ChatSettingsComponent implements OnInit {
  private _systemSettingsClient: SystemSettingsClient;

  private enableWhispersControl: FormControl = new FormControl(false);
  private muteBiliomiControl: FormControl = new FormControl(false);

  constructor(systemSettingsClient: SystemSettingsClient) {
    this._systemSettingsClient = systemSettingsClient;
  }

  public async ngOnInit() {
    await this._systemSettingsClient.load(true);
    this.enableWhispersControl.setValue(this._systemSettingsClient.EnableWhispers);
    this.muteBiliomiControl.setValue(this._systemSettingsClient.Muted);
  }

  private save() {
    this._systemSettingsClient.EnableWhispers = this.enableWhispersControl.value;
    this._systemSettingsClient.Muted = this.muteBiliomiControl.value;
    this._systemSettingsClient.save();
  }
}
