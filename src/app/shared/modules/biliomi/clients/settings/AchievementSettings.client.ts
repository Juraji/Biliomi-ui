import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import { Injectable } from "@angular/core";
import IAchievementsSettings = Biliomi.IAchievementsSettings;

@Injectable()
export class AchievementSettingsClient extends SettingsRestClient<IAchievementsSettings> implements IAchievementsSettings {
    public AchievementsEnabled: boolean;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/games/settings/achievements");
    }
}
