import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IAdventureRecord = Biliomi.IAdventureRecord;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AdventureRecordsClient extends ModelRestClient<IAdventureRecord> {
  constructor(api: BiliomiApiService) {
    super(api, "/games/adventurerecords");
  }
}
