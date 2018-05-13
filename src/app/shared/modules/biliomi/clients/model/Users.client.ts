import { Injectable } from "@angular/core";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import { CachedModelRestClient } from "../../classes/abstract/CachedModelRestClient";
import { StringUtils } from "../../../tools/StringUtils";
import IUser = Biliomi.IUser;

@Injectable()
export class UsersClient extends CachedModelRestClient<IUser> {

    constructor(api: BiliomiApiService) {
        super(api, "/core/users");
    }

    public searchCache(query: string) {
        return super.searchCacheByPredicate((u: IUser) => StringUtils.containsIgnoreCase(u.Username, query));
    }

    public async getUserByUsername(username: string): Promise<IUser> {
        let user = await this._api.get<IUser>("/core/users/byusername/" + username);
        if (super.searchCacheById(user.Id) == null) {
            this._cache.append(user);
        }
        return user;
    }
}
