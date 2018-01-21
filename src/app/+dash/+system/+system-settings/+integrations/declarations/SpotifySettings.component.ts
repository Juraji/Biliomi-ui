import {Component, OnInit} from "@angular/core";
import {SpotifySettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/SpotifySettings.client";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: "spotify-settings",
  templateUrl: require("./SpotifySettings.template.pug")
})
export class SpotifySettingsComponent implements OnInit {
  private _spotifySettingsClient: SpotifySettingsClient;

  public songrequestsEnabledControl: FormControl = new FormControl(false);
  public songRequestPlaylistIdControl: FormControl = new FormControl("", [Validators.required]);
  public maxDurationControl: FormControl = new FormControl(0, [Validators.required, Validators.min(60000)]);

  constructor(spotifySettingsClient: SpotifySettingsClient) {
    this._spotifySettingsClient = spotifySettingsClient;
  }

  public ngOnInit() {
    this.initFields();
  }

  public get isFormOk(): boolean {
    return !this.songrequestsEnabledControl.value
      || (this.songRequestPlaylistIdControl.valid && this.maxDurationControl.valid);
  }

  public async initFields() {
    await this._spotifySettingsClient.load(true);
    this.songrequestsEnabledControl.reset(this._spotifySettingsClient.SongrequestsEnabled);
    this.songRequestPlaylistIdControl.reset(this._spotifySettingsClient.SongRequestPlaylistId);
    this.maxDurationControl.reset(this._spotifySettingsClient.MaxDuration);
  }

  public async save() {
    if (this.isFormOk) {
      this._spotifySettingsClient.SongrequestsEnabled = this.songrequestsEnabledControl.value;
      this._spotifySettingsClient.SongRequestPlaylistId = this.songRequestPlaylistIdControl.value;
      this._spotifySettingsClient.MaxDuration = this.maxDurationControl.value;

      let success = await this._spotifySettingsClient.save();
      if (success) {
        this.initFields();
      }
    }
  }
}
