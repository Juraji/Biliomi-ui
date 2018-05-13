import { Injectable } from "@angular/core";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import IUserGreetingSettings = Biliomi.IUserGreetingSettings;

@Injectable()
export class UserGreetingSettingsClient extends SettingsRestClient<IUserGreetingSettings> implements IUserGreetingSettings {
    public EnableGreetings: boolean;
    public GreetingTimeout: number;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/chat/settings/usergreetings");
    }
}
