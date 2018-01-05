import {Injectable} from "@angular/core";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../services/BiliomiApi.service";
import {Observable} from "rxjs/Observable";
import IUser = Biliomi.IUser;
import IPaginatedResponse = Biliomi.IPaginatedResponse;

@Injectable()
export class ViewersClient {
  private _api: BiliomiApiService;
  private _viewers: IUser[] = [];

  public get viewers(): IUser[] {
    return this._viewers.slice();
  }

  public get count(): number {
    return this._viewers.length;
  }

  constructor(api: BiliomiApiService) {
    this._api = api;

    this.load();
    Observable
      .interval(6e4)
      .subscribe(() => this.load());
  }

  private async load() {
    let response = await this._api.get<IPaginatedResponse<IUser>>("/channel/viewers");

    if (response != null) {
      this._viewers = response.Entities
        .sort((a: IUser, b: IUser) => a.Username.localeCompare(b.Username));
    } else {
      this._viewers = [];
    }
  }
}
