import {Component, OnInit} from "@angular/core";
import {SubscriberWatchSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/SubscriberWatchSettings.client";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: "subscribers-settings",
  templateUrl: require("./Subscribers.template.pug")
})
export class SubscribersComponent implements OnInit {
  private _subscriberWatchSettingsClient: SubscriberWatchSettingsClient;

  private subscriberRewardTier1Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private subscriberRewardTier2Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private subscriberRewardTier3Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  constructor(subscriberWatchSettingsClient: SubscriberWatchSettingsClient) {
    this._subscriberWatchSettingsClient = subscriberWatchSettingsClient;
  }

  public ngOnInit() {
    this.initSettingsFields();
  }

  public async initSettingsFields() {
    await this._subscriberWatchSettingsClient.load(true);
    this.subscriberRewardTier1Control.setValue(this._subscriberWatchSettingsClient.RewardTier1);
    this.subscriberRewardTier2Control.setValue(this._subscriberWatchSettingsClient.RewardTier2);
    this.subscriberRewardTier3Control.setValue(this._subscriberWatchSettingsClient.RewardTier3);
  }

  public get isSettingsFormOk(): boolean {
    return this.subscriberRewardTier1Control.valid
      && this.subscriberRewardTier2Control.valid
      && this.subscriberRewardTier3Control.valid;
  }

  public saveSettings() {
    if (this.isSettingsFormOk) {
      this._subscriberWatchSettingsClient.RewardTier1 = this.subscriberRewardTier1Control.value;
      this._subscriberWatchSettingsClient.RewardTier2 = this.subscriberRewardTier2Control.value;
      this._subscriberWatchSettingsClient.RewardTier3 = this.subscriberRewardTier3Control.value;
      this._subscriberWatchSettingsClient.save();
    }
  }
}
