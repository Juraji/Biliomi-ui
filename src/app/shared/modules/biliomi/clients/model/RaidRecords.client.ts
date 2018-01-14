import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IRaidRecord = Biliomi.IRaidRecord;
import IDirection = Biliomi.IDirection;

@Injectable()
export class RaidRecordsClient extends ModelRestClient<IRaidRecord> {
  constructor(api: BiliomiApiService) {
    super(api, "/registers/raidrecords");
  }

  registerRaid(direction: IDirection, channel: string): Promise<boolean> {
    if (direction === IDirection.OUTGOING) {
      return this._api.postCommand("raid", channel);
    } else {
      return this._api.postCommand("raider", channel);
    }
  }
}