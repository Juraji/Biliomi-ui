import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";
import IHostRecord = Biliomi.IHostRecord;

@Injectable()
export class HostRecordsClient extends ModelRestClient<IHostRecord> {

  constructor(api: BiliomiApiService) {
    super(api, "/chat/hostrecords");
  }
}
