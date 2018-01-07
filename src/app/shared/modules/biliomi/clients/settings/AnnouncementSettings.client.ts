import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IAnnouncementsSettings = Biliomi.IAnnouncementsSettings;
import {BiliomiApiService} from "../../services/BiliomiApi.service";

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
