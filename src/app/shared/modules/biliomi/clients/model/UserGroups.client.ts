import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {CachedModelRestClient} from "../../classes/CachedModelRestClient";
import {StringUtils} from "../../../tools/StringUtils";
import IUserGroup = Biliomi.IUserGroup;

@Injectable()
export class UserGroupsClient extends CachedModelRestClient<IUserGroup> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/usergroups");
  }

  public getCacheSearch(query: string): IUserGroup[] {
    if (StringUtils.isNotEmpty(query)) {
      return this._cache.get()
        .filter((g: IUserGroup) => StringUtils.containsIgnoreCase(g.Name, query))
    }
    return this._cache.get();
  }

  public getDefaultGroup(): IUserGroup {
    return this.getCache()
      .filter((g: IUserGroup) => g.DefaultGroup)
      .pop();
  }
}
