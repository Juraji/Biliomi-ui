import { ModelRestClient } from "../../classes/abstract/ModelRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import { Injectable } from "@angular/core";
import IAdventureRecord = Biliomi.IAdventureRecord;

@Injectable()
export class AdventureRecordsClient extends ModelRestClient<IAdventureRecord> {
    constructor(api: BiliomiApiService) {
        super(api, "/games/adventurerecords");
    }
}
