import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {ModelRestClient} from "../../classes/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IModerationRecord = Biliomi.IModerationRecord;

@Injectable()
export class ModerationRecordsClient extends ModelRestClient<IModerationRecord> {

  constructor(api: BiliomiApiService) {
    super(api, "/chat/moderationrecords");
  }

  public get(id: number, params?: HttpParams): Promise<IModerationRecord> {
    return null;
  }

  public post(obj: Biliomi.IModerationRecord, params?: HttpParams): Promise<IModerationRecord> {
    return null;
  }

  public put(id: number, obj: Biliomi.IModerationRecord, params?: HttpParams): Promise<IModerationRecord> {
    return null;
  }
}
