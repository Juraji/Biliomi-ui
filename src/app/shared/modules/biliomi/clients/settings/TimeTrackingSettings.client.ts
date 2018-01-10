import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import ITimeTrackingSettings = Biliomi.ITimeTrackingSettings;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";

@Injectable()
export class TimeTrackingSettingsClient extends SettingsRestClient<ITimeTrackingSettings> implements ITimeTrackingSettings {
  public Type: string;
  public TrackOnline: boolean;
  public TrackOffline: boolean;

  constructor(api: BiliomiApiService) {
    super(api, "/core/settings/timetracking");
  }
}
