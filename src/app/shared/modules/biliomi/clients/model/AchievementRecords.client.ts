import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IAchievementRecord = Biliomi.IAchievementRecord;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AchievementRecordsClient extends ModelRestClient<IAchievementRecord> {

  constructor(api: BiliomiApiService) {
    super(api, "/games/achievements");
  }
}
