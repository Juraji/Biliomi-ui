import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import ISubscriberWatchSettings = Biliomi.ISubscriberWatchSettings;

@Injectable()
export class SubscriberWatchSettingsClient extends SettingsRestClient<ISubscriberWatchSettings> implements ISubscriberWatchSettings {
  public RewardTier1: number;
  public RewardTier2: number;
  public RewardTier3: number;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/chat/settings/subscriberwatch");
  }
}
