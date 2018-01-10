import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IAchievementsSettings = Biliomi.IAchievementsSettings;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AchievementSettingsClient extends SettingsRestClient<IAchievementsSettings> implements IAchievementsSettings {
  public AchievementsEnabled: boolean;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/games/settings/achievements");
  }
}
