import {Component, OnInit} from "@angular/core";
import {FollowerWatchSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/FollowerWatchSettings.client";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: "followers-settings",
  templateUrl: require("./Followers.template.pug")
})
export class FollowersComponent implements OnInit {
  private _followerWatchSettingsClient: FollowerWatchSettingsClient;

  private followerRewardControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  constructor(followerWatchSettingsClient: FollowerWatchSettingsClient) {
    this._followerWatchSettingsClient = followerWatchSettingsClient;
  }

  public ngOnInit() {
    this.initSettingsFields();
  }

  public async initSettingsFields() {
    await this._followerWatchSettingsClient.load(true);
    this.followerRewardControl.setValue(this._followerWatchSettingsClient.Reward);
  }

  public get isSettingsFormOk(): boolean {
    return this.followerRewardControl.valid;
  }

  public saveSettings() {
    if (this.isSettingsFormOk) {
      this._followerWatchSettingsClient.Reward = this.followerRewardControl.value;
      this._followerWatchSettingsClient.save();
    }
  }
}
