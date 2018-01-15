import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IRouletteRecord = Biliomi.IRouletteRecord;

@Injectable()
export class RouletteRecordsClient extends ModelRestClient<IRouletteRecord> {
  constructor(api: BiliomiApiService) {
    super(api, "/games/rouletterecords");
  }
}
