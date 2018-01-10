import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import ICommunitiesSettings = Biliomi.ICommunitiesSettings;
import ICommunity = Biliomi.ICommunity;
import {Injectable} from "@angular/core";

@Injectable()
export class CommunitiesSettingsClient extends SettingsRestClient<ICommunitiesSettings> implements ICommunitiesSettings {
  public AutoUpdateCommunities: boolean;
  public DefaultCommunities: ICommunity[];
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/core/settings/communities");
  }
}
