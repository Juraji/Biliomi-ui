import { Injectable } from "@angular/core";
import { Biliomi } from "../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../services/BiliomiApi.service";
import { interval } from "rxjs/observable/interval";
import IUser = Biliomi.IUser;
import IPaginatedResponse = Biliomi.IPaginatedResponse;

@Injectable()
export class ViewersClient {
    private _api: BiliomiApiService;

    constructor(api: BiliomiApiService) {
        this._api = api;

        this.load();
        interval(6e4)
            .subscribe(() => this.load());
    }

    private _viewers: IUser[] = [];

    public get viewers(): IUser[] {
        return this._viewers.slice();
    }

    public get count(): number {
        return this._viewers.length;
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
