import { Injectable } from "@angular/core";
import { ModelRestClient } from "../../classes/abstract/ModelRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import ICommandHistoryRecord = Biliomi.ICommandHistoryRecord;

@Injectable()
export class CommandHistoryRecordsClient extends ModelRestClient<ICommandHistoryRecord> {
    constructor(api: BiliomiApiService) {
        super(api, "/core/commandhistoryrecords");
    }
}
