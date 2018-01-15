import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IRouletteSettings = Biliomi.IRouletteSettings;
import {BiliomiApiService} from "../../services/BiliomiApi.service";

@Injectable()
export class RouletteSettingsClient extends SettingsRestClient<IRouletteSettings> implements IRouletteSettings {
  public TimeoutOnDeathEnabled: boolean;
  public TimeoutOnDeath: number;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/games/settings/roulette");
  }
}
