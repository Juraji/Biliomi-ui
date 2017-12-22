import {ModelRestClient} from "../../classes/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {HttpParams} from "@angular/common/http";
import IUser = Biliomi.IUser;
import {Injectable} from "@angular/core";

@Injectable()
export class LatestFollowersClient extends ModelRestClient<IUser> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/users/latest/followers");
  }

  public get(id: number, params?: HttpParams): Promise<Biliomi.IUser> {
    throw new Error("Invalid operation on LatestFollowersClient");
  }

  public post(obj: Biliomi.IUser, params?: HttpParams): Promise<Biliomi.IUser> {
    throw new Error("Invalid operation on LatestFollowersClient");
  }

  public put(id: number, obj: Biliomi.IUser, params?: HttpParams): Promise<Biliomi.IUser> {
    throw new Error("Invalid operation on LatestFollowersClient");
  }

  public delete(id: number, params?: HttpParams): Promise<boolean> {
    throw new Error("Invalid operation on LatestFollowersClient");
  }

  public async getLatestFollower(): Promise<IUser> {
    let params: HttpParams = new HttpParams().set("limit", "1");
    let arr: IUser[] = await this._api.get<IUser[]>(this.baseResourceUri, params);
    if (arr != null && arr.length > 0) {
      return arr.pop();
    }
    return null;
  }
}
