import { Injectable } from "@angular/core";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import IChatModeratorSettings = Biliomi.IChatModeratorSettings;
import IUserGroup = Biliomi.IUserGroup;
import IModerationAction = Biliomi.IModerationAction;

@Injectable()
export class ChatModeratorSettingsClient extends SettingsRestClient<IChatModeratorSettings> implements IChatModeratorSettings {
    public LinksAllowed: boolean;
    public LinkPermitExpireTime: number;
    public ExcessiveCapsAllowed: boolean;
    public CapsTrigger: number;
    public CapsTriggerRatio: number;
    public RepeatedCharactersAllowed: boolean;
    public RepeatedCharacterTrigger: number;
    public LinkWhitelist: string[];
    public ExemptedGroup: IUserGroup;
    public FirstStrike: IModerationAction;
    public SecondStrike: IModerationAction;
    public ThirdStrike: IModerationAction;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/chat/settings/chatmoderator");
    }
}
