import { Injectable } from "@angular/core";
import { ModelRestClient } from "../../classes/abstract/ModelRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import IAnnouncement = Biliomi.IAnnouncement;

@Injectable()
export class AnnouncementsClient extends ModelRestClient<IAnnouncement> {
    constructor(api: BiliomiApiService) {
        super(api, "/chat/announcements");
    }
}
