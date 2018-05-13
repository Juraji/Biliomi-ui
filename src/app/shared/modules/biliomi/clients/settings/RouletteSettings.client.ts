import { Injectable } from "@angular/core";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import IRouletteSettings = Biliomi.IRouletteSettings;

@Injectable()
export class RouletteSettingsClient extends SettingsRestClient<IRouletteSettings> implements IRouletteSettings {
    public TimeoutOnDeathEnabled: boolean;
    public TimeoutOnDeath: number;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/games/settings/roulette");
    }
}
