import {Injectable} from "@angular/core";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../services/BiliomiApi.service";
import {Observable} from "rxjs/Observable";
import IUser = Biliomi.IUser;
import IPaginatedResponse = Biliomi.IPaginatedResponse;

@Injectable()
export class HostersClient {
  private _api: BiliomiApiService;
  private _hosters: IUser[] = [];

  public get hosters(): IUser[] {
    return this._hosters.slice();
  }

  public get count(): number {
    return this._hosters.length;
  }

  constructor(api: BiliomiApiService) {
    this._api = api;

    this.load();
    Observable
      .interval(6e4)
      .subscribe(() => this.load());
  }

  private async load() {
    let response = await this._api.get<IPaginatedResponse<IUser>>("/channel/hosters");

    if (response != null) {
      this._hosters = response.Entities
        .sort((a: IUser, b: IUser) => a.Username.localeCompare(b.Username));
    } else {
      this._hosters = [];
    }
  }
}