import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IAnnouncement = Biliomi.IAnnouncement;
import {BiliomiApiService} from "../../services/BiliomiApi.service";

@Injectable()
export class AnnouncementsClient extends ModelRestClient<IAnnouncement> {
  constructor(api: BiliomiApiService) {
    super(api, "/chat/announcements");
  }
}
