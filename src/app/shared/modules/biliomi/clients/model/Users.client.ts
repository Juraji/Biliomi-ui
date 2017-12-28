import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {CachedModelRestClient} from "../../classes/CachedModelRestClient";
import {StringUtils} from "../../../tools/StringUtils";
import IUser = Biliomi.IUser;

@Injectable()
export class UsersClient extends CachedModelRestClient<IUser> {

  constructor(api: BiliomiApiService) {
    super(api, "/core/users");
  }

  public searchCache(query: string) {
    return super.searchCacheByPredicate((u: IUser) => StringUtils.containsIgnoreCase(u.Username, query));
  }

  public getUserByUsername(username: string, createIfNotExists: boolean): Promise<IUser> {
    let params: Map<string, any> = new Map<string, any>()
      .set("createifnotexists", createIfNotExists.toString());
    return this._api.get("/core/users/byusername/" + username, params);
  }
}
