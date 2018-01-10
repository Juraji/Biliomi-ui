import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";
import IUser = Biliomi.IUser;
import IPaginatedResponse = Biliomi.IPaginatedResponse;

@Injectable()
export class LatestSubscribersClient extends ModelRestClient<IUser> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/users/latest/subscribers");
  }

  public get(id: number, params?: Map<string, any>): Promise<Biliomi.IUser> {
    throw new Error("Invalid operation on LatestSubscribersClient");
  }

  public post(obj: Biliomi.IUser, params?: Map<string, any>): Promise<Biliomi.IUser> {
    throw new Error("Invalid operation on LatestSubscribersClient");
  }

  public put(id: number, obj: Biliomi.IUser, params?: Map<string, any>): Promise<Biliomi.IUser> {
    throw new Error("Invalid operation on LatestSubscribersClient");
  }

  public delete(id: number, params?: Map<string, any>): Promise<boolean> {
    throw new Error("Invalid operation on LatestSubscribersClient");
  }

  public async getLatestSubscriber(): Promise<IUser> {
    let response: IPaginatedResponse<IUser> = await this.getList();
    if (response != null && response.TotalAvailable > 0) {
      return response.Entities.pop();
    }
    return null;
  }
}
