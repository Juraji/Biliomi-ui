import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import ISteamSettings = Biliomi.ISteamSettings;

@Injectable()
export class SteamSettingsClient extends SettingsRestClient<ISteamSettings> implements ISteamSettings {
  public AutoUpdateChannelGame: boolean;
  public _IntegrationEnabled: boolean;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/social/steam/settings");
  }
}