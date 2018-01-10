import {Biliomi} from "../../classes/interfaces/Biliomi";
import {Injectable} from "@angular/core";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {CachedModelRestClient} from "../../classes/abstract/CachedModelRestClient";
import {StringUtils} from "../../../tools/StringUtils";
import {SortBuilder} from "../../classes/SortBuilder";
import ICommunity = Biliomi.ICommunity;

@Injectable()
export class CommunitiesClient extends CachedModelRestClient<ICommunity> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/communities");
  }

  public load(refresh?: boolean): Promise<Biliomi.ICommunity[]> {
    let sort: SortBuilder = new SortBuilder()
      .add("Name");
    return super.load(refresh, sort);
  }

  public async searchCommunityByName(name: string): Promise<ICommunity> {
    let result: ICommunity = await this._api.get<ICommunity>(this.baseResourceUri + "/search/" + name);
    this._cache.get().push(result);
    return result;
  }

  public searchCache(query: string) {
    return super.searchCacheByPredicate((c: ICommunity) =>
      StringUtils.containsIgnoreCase(c.Name, query) || StringUtils.containsIgnoreCase(c.Owner.Username, query));
  }
}
