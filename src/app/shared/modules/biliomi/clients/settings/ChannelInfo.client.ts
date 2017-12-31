import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IChannelInfo = Biliomi.IChannelInfo;
import IUser = Biliomi.IUser;
import IGame = Biliomi.IGame;

@Injectable()
export class ChannelInfoClient extends SettingsRestClient<IChannelInfo> implements IChannelInfo {
  public LogoUri: string;
  public PreviewUri: string;
  public Affiliate: boolean;
  public Partner: boolean;
  public ChannelName: string;
  public IsOnline: boolean;
  public Status: string;
  public StatusWithoutTemplate: string;
  public CurrentGame: IGame = {} as IGame;
  public FollowerCount: number = 0;
  public SubscriberCount: number = 0;
  public Viewers: IUser[] = [];
  public Hosters: IUser[] = [];

  public get ViewerCount(): number {
    return this.Viewers.length;
  }

  public get HosterCount(): number {
    return this.Hosters.length;
  }

  constructor(api: BiliomiApiService) {
    super(api, "/info/channel", 6e4);
  }

  public async load(refresh: boolean = false): Promise<void> {
    await super.load(refresh);

    // Sort viewers by Username for easthetics
    this.Viewers = (this.Viewers || [])
      .sort((a: IUser, b: IUser) => a.Username.localeCompare(b.Username))
      .sort((a: IUser, b: IUser) => (a.Caster || a.Moderator ? -1 : 1));
    // Sort hosters by Username for easthetics
    this.Hosters = (this.Hosters || []).sort((a: IUser, b: IUser) => a.Username.localeCompare(b.Username));

    // Append a timestamp to the preview uri, so angular will refresh it
    if (this.PreviewUri != null) {
      this.PreviewUri += "?t=" + new Date().getMilliseconds();
    }
  }

  public save(): Promise<Biliomi.IChannelInfo> {
    throw Error("Save action is not allowed for channel info");
  }

  private sortUsers(a: IUser, b: IUser): number {
    if (a.Caster || a.Moderator) {
      return 1;
    } else if (b.Caster || b.Moderator) {
      return -1;
    }

    return a.Username.localeCompare(b.Username);
  }
}
