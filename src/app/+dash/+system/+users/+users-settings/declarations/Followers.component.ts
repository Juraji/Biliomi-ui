import { Component, OnInit } from "@angular/core";
import { FollowerWatchSettingsClient } from "../../../../../shared/modules/biliomi/clients/settings/FollowerWatchSettings.client";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "followers-settings",
    templateUrl: require("./Followers.template.html")
})
export class FollowersComponent implements OnInit {
    private _followerWatchSettingsClient: FollowerWatchSettingsClient;

    private followerRewardControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

    constructor(followerWatchSettingsClient: FollowerWatchSettingsClient) {
        this._followerWatchSettingsClient = followerWatchSettingsClient;
    }

    public get isSettingsFormOk(): boolean {
        return this.followerRewardControl.valid;
    }

    public ngOnInit() {
        this.initSettingsFields();
    }

    public async initSettingsFields() {
        await this._followerWatchSettingsClient.load(true);
        this.followerRewardControl.reset(this._followerWatchSettingsClient.Reward);
    }

    public saveSettings() {
        if (this.isSettingsFormOk) {
            this._followerWatchSettingsClient.Reward = this.followerRewardControl.value;
            let result = this._followerWatchSettingsClient.save();
            return result != null;
        }

        return null;
    }
}
