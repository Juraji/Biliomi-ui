import {Component, OnInit} from "@angular/core";
import {TimeTrackingSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/TimeTrackingSettings.client";
import {FormControl} from "@angular/forms";

@Component({
  selector: "time-tracking-settings-component",
  templateUrl: require("./TimeTrackingSettings.template.pug")
})
export class TimeTrackingSettingsComponent implements OnInit {
  private _timeTrackingSettingsClient: TimeTrackingSettingsClient;

  private trackOnlineTimeControl: FormControl = new FormControl(false);
  private trackOfflineTimeControl: FormControl = new FormControl(false);

  constructor(timeTrackingSettingsClient: TimeTrackingSettingsClient) {
    this._timeTrackingSettingsClient = timeTrackingSettingsClient;
  }

  public async ngOnInit() {
    await this._timeTrackingSettingsClient.load(true);
    this.trackOnlineTimeControl.reset(this._timeTrackingSettingsClient.TrackOnline);
    this.trackOfflineTimeControl.reset(this._timeTrackingSettingsClient.TrackOffline);
  }

  private save() {
    this._timeTrackingSettingsClient.TrackOnline = this.trackOnlineTimeControl.value;
    this._timeTrackingSettingsClient.TrackOffline = this.trackOfflineTimeControl.value;
    this._timeTrackingSettingsClient.save();
  }
}
