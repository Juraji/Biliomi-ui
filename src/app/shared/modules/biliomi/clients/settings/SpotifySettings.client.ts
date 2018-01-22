import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import ISpotifySettings = Biliomi.ISpotifySettings;
import {BiliomiApiService} from "../../services/BiliomiApi.service";

@Injectable()
export class SpotifySettingsClient extends SettingsRestClient<ISpotifySettings> implements ISpotifySettings {
  public _IntegrationEnabled: boolean;
  public MaxDuration: number;
  public SongrequestsEnabled: boolean;
  public SongRequestPlaylistId: string;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/social/spotify/settings");
  }
}
