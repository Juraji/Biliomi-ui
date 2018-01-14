import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import ICommandHistoryRecord = Biliomi.ICommandHistoryRecord;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CommandHistoryRecordsClient extends ModelRestClient<ICommandHistoryRecord> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/commandhistoryrecords");
  }
}