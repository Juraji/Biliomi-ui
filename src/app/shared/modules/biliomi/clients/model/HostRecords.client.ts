import {ModelRestClient} from "../../classes/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {HttpParams} from "@angular/common/http";
import IHostRecord = Biliomi.IHostRecord;
import IDirection = Biliomi.IDirection;
import {Injectable} from "@angular/core";

@Injectable()
export class HostRecordsClient extends ModelRestClient<IHostRecord> {

  constructor(api: BiliomiApiService) {
    super(api, "/chat/hostrecords");
  }

  public getIncomingRecords(): Promise<IHostRecord[]> {
    let params: HttpParams = new HttpParams()
      .set("direction", IDirection.INCOMING);
    return this.getList(null, params);
  }

  public getOutgoingRecords(): Promise<IHostRecord[]> {
    let params: HttpParams = new HttpParams()
      .set("direction", IDirection.OUTGOING);
    return this.getList(null, params);
  }
}
