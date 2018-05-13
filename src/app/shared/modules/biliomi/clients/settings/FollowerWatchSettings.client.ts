import { Injectable } from "@angular/core";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import IFollowerWatchSettings = Biliomi.IFollowerWatchSettings;

@Injectable()
export class FollowerWatchSettingsClient extends SettingsRestClient<IFollowerWatchSettings> implements IFollowerWatchSettings {
    public Reward: number;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/chat/settings/followerwatch");
    }
}
