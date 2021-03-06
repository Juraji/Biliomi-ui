import { Component, OnInit } from "@angular/core";
import { SpotifySettingsClient } from "../../../../../shared/modules/biliomi/clients/settings/SpotifySettings.client";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "spotify-settings",
    templateUrl: require("./SpotifySettings.template.html")
})
export class SpotifySettingsComponent implements OnInit {
    public songrequestsEnabledControl: FormControl = new FormControl(false);
    public songRequestPlaylistIdControl: FormControl = new FormControl("", [Validators.required]);
    public maxDurationControl: FormControl = new FormControl(0, [Validators.required, Validators.min(60000)]);
    private _spotifySettingsClient: SpotifySettingsClient;

    constructor(spotifySettingsClient: SpotifySettingsClient) {
        this._spotifySettingsClient = spotifySettingsClient;
    }

    public get isFormOk(): boolean {
        return !this.songrequestsEnabledControl.value
            || (this.songRequestPlaylistIdControl.valid && this.maxDurationControl.valid);
    }

    public ngOnInit() {
        this.initFields();
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

            return success != null;
        }

        return null;
    }
}
