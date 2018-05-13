import { Injectable } from "@angular/core";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import ISpotifySettings = Biliomi.ISpotifySettings;

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
