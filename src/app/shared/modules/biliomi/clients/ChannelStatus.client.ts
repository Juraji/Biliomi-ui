import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../classes/abstract/SettingsRestClient";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../services/BiliomiApi.service";
import IChannelStatus = Biliomi.IChannelStatus;
import IGame = Biliomi.IGame;

@Injectable()
export class ChannelStatusClient extends SettingsRestClient<IChannelStatus> implements IChannelStatus {
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

  constructor(api: BiliomiApiService) {
    super(api, "/channel/status", 6e4);
    this.load();
  }

  public async load(refresh: boolean = false): Promise<void> {
    await super.load(refresh);

    // Append a timestamp to the preview uri, so angular will refresh it
    if (this.PreviewUri != null) {
      this.PreviewUri += "?t=" + new Date().getMilliseconds();
    }
  }

  public save(): Promise<IChannelStatus> {
    throw Error("Save action is not allowed for channel info");
  }

  public updateGame(game: string): Promise<boolean> {
    return this.api.postCommand("channel", "game", game);
  }

  public updateStatus(status: string) {
    return this.api.postCommand("channel", "status", status);
  }
}
