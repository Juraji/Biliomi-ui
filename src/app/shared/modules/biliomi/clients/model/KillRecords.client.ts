import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IKillRecord = Biliomi.IKillRecord;

@Injectable()
export class KillRecordsClient extends ModelRestClient<IKillRecord> {
  constructor(api: BiliomiApiService) {
    super(api, "/games/killrecords");
  }
}
