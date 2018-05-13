import { Injectable } from "@angular/core";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import IAnnouncementsSettings = Biliomi.IAnnouncementsSettings;

@Injectable()
export class AnnouncementSettingsClient extends SettingsRestClient<IAnnouncementsSettings> implements IAnnouncementsSettings {
    public Enabled: boolean;
    public Shuffle: boolean;
    public RunInterval: number;
    public MinChatMessages: number;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/chat/settings/announcements");
    }
}
