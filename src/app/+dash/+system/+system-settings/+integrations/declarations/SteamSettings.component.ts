import {Component, OnInit} from "@angular/core";
import {SteamSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/SteamSettings.client";
import {FormControl} from "@angular/forms";

@Component({
  selector: "steam-settings",
  templateUrl: require("./SteamSettings.template.pug")
})
export class SteamSettingsComponent implements OnInit {
  private _steamSettingsClient: SteamSettingsClient;

  private autoUpdateChannelGameControl: FormControl = new FormControl(false);

  constructor(steamSettingsClient: SteamSettingsClient) {
    this._steamSettingsClient = steamSettingsClient;
  }

  public ngOnInit() {
    this.initFields();
  }

  private async initFields() {
    await this._steamSettingsClient.load(true);
    this.autoUpdateChannelGameControl.reset(this._steamSettingsClient.AutoUpdateChannelGame);
  }

  public async save() {
    this._steamSettingsClient.AutoUpdateChannelGame = this.autoUpdateChannelGameControl.value;
    let success = await this._steamSettingsClient.save();
    if (success) {
      this.initFields();
    }
  }
}
