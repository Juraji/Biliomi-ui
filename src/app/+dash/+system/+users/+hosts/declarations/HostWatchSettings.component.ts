import { Component, OnInit } from "@angular/core";
import { HostWatchSettingsClient } from "../../../../../shared/modules/biliomi/clients/settings/HostWatchSettings.client";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "host-watch-settings",
    templateUrl: require("./HostWatchSettings.template.html")
})
export class HostWatchSettingsComponent implements OnInit {
    private _hostWatchSettingsClient: HostWatchSettingsClient;
    private hostRewardControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

    constructor(hostWatchSettingsClient: HostWatchSettingsClient) {
        this._hostWatchSettingsClient = hostWatchSettingsClient;
    }

    public get isFormOk(): boolean {
        return this.hostRewardControl.valid;
    }

    public async ngOnInit() {
        await this._hostWatchSettingsClient.load(true);
        this.hostRewardControl.reset(this._hostWatchSettingsClient.Reward);
    }

    public async saveSettings() {
        this._hostWatchSettingsClient.Reward = this.hostRewardControl.value;
        let result = await this._hostWatchSettingsClient.save();

        return result != null;
    }
}
