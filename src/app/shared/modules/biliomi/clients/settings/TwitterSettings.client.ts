import { Injectable } from "@angular/core";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import ITwitterSettings = Biliomi.ITwitterSettings;

@Injectable()
export class TwitterSettingsClient extends SettingsRestClient<ITwitterSettings> implements ITwitterSettings {
    public _IntegrationEnabled: boolean;
    public TrackedKeywords: string[];
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/social/twitter/settings");
    }
}
