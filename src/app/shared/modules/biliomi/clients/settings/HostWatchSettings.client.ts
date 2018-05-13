import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import { Injectable } from "@angular/core";
import IHostWatchSettings = Biliomi.IHostWatchSettings;

@Injectable()
export class HostWatchSettingsClient extends SettingsRestClient<IHostWatchSettings> implements IHostWatchSettings {
    public Reward: number;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/chat/settings/hostwatch");
    }
}
