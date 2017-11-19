import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IChannelInfo = Biliomi.IChannelInfo;
import IUser = Biliomi.IUser;
import IGame = Biliomi.IGame;
import {BiliomiApiService} from "../../services/BiliomiApi.service";

@Injectable()
export class ChannelInfoClient extends SettingsRestClient<IChannelInfo> implements IChannelInfo {
  public LogoUri: string;
  public PreviewUri: string;
  public Partner: boolean;
  public ChannelName: string;
  public IsOnline: boolean;
  public Status: string;
  public CurrentGame: IGame = {} as IGame;
  public FollowerCount: number = 0;
  public SubscriberCount: number = 0;
  public Viewers: IUser[] = [];
  public Hosters: IUser[] = [];

  constructor(api: BiliomiApiService) {
    super(api, "/info/channel", 6e4);
  }

  public async load(refresh: boolean = false): Promise<void> {
    await super.load(refresh);
    if (this.PreviewUri != null) {
      this.PreviewUri += '?t=' + new Date().getMilliseconds();
    }
  }

  public save(): Promise<Biliomi.IChannelInfo> {
    throw Error("Save action is not allowed for channel info");
  }
}
