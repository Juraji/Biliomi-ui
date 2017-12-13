import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {CachedModelRestClient} from "../../classes/CachedModelRestClient";
import IUserGroup = Biliomi.IUserGroup;

@Injectable()
export class UserGroupsClient extends CachedModelRestClient<IUserGroup> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/usergroups");
  }
  public getDefaultGroup(): IUserGroup {
    return this.getCache()
      .filter((g: IUserGroup) => g.DefaultGroup)
      .pop();
  }
}
