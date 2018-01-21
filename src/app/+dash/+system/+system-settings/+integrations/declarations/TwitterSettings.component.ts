import {Component, OnInit} from "@angular/core";
import {TwitterSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/TwitterSettings.client";

@Component({
  selector: "twitter-settings",
  templateUrl: require("./TwitterSettings.template.pug")
})
export class TwitterSettingsComponent implements OnInit {
  private _twitterSettingsClient: TwitterSettingsClient;

  public trackedWords: string[];

  constructor(twitterSettingsClient: TwitterSettingsClient) {
    this._twitterSettingsClient = twitterSettingsClient;
  }

  public ngOnInit() {
    this.initFields();
  }

  public async initFields() {
    await this._twitterSettingsClient.load(true);
    this.trackedWords = this._twitterSettingsClient.TrackedKeywords || [];
  }

  public async save() {
    this._twitterSettingsClient.TrackedKeywords = this.trackedWords;
    let success = await this._twitterSettingsClient.save();
    if (success) {
      this.initFields();
    }
  }
}
