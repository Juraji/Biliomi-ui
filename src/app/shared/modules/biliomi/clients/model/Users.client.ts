import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {HttpParams} from "@angular/common/http";
import {CachedModelRestClient} from "../../classes/CachedModelRestClient";
import {StringUtils} from "../../../tools/StringUtils";
import IUser = Biliomi.IUser;

@Injectable()
export class UsersClient extends CachedModelRestClient<IUser> {

  constructor(api: BiliomiApiService) {
    super(api, "/core/users");
  }

  public searchCache(query: string) {
    return super.searchCacheByPredicate((u: IUser) => StringUtils.containsIgnoreCase(u.Username, query))
  }

  public async getLatestFollower(): Promise<IUser> {
    let arr: IUser[] = await this.getLatestFollowers(1);
    if (arr != null && arr.length > 0) {
      return arr.pop();
    }
    return null;
  }

  public getLatestFollowers(limit: number): Promise<IUser[]> {
    let params: HttpParams = new HttpParams()
      .set("limit", limit.toString());
    return this._api.get("/core/users/latest/followers", params);
  }

  public async getLatestSubscriber(): Promise<IUser> {
    let arr: IUser[] = await this.getLatestSubscribers(1);
    if (arr != null && arr.length > 0) {
      return arr.pop();
    }
    return null;
  }

  public getLatestSubscribers(limit: number): Promise<IUser[]> {
    let params: HttpParams = new HttpParams()
      .set("limit", limit.toString());
    return this._api.get("/core/users/latest/subscribers", params);
  }

  public getUserByUsername(username: string, createIfNotExists: boolean): Promise<IUser> {
    let params: HttpParams = new HttpParams()
      .set("createifnotexists", createIfNotExists.toString());
    return this._api.get("/core/users/byusername/" + username, params);
  }
}
