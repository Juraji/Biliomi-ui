import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {CachedModelRestClient} from "../../classes/CachedModelRestClient";
import {SortBuilder} from "../../classes/SortBuilder";
import IUserGroup = Biliomi.IUserGroup;

@Injectable()
export class UserGroupsClient extends CachedModelRestClient<IUserGroup> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/usergroups");
  }

  public async load(refresh?: boolean): Promise<Biliomi.IUserGroup[]> {
    let groupSort = new SortBuilder()
      .add("DefaultGroup", true)
      .add("Weight", false);
    return super.load(refresh, groupSort);
  }

  public getDefaultGroup(): IUserGroup {
    return this.getCache()
      .filter((g: IUserGroup) => g.DefaultGroup)
      .pop();
  }
}
