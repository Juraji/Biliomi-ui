import {Injectable} from "@angular/core";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import ILogInfo = Biliomi.ILogInfo;

@Injectable()
export class ChatLogsClient {
  private _api: BiliomiApiService;

  constructor(api: BiliomiApiService) {
    this._api = api;
  }

  public getLatestLog(): Promise<ILogInfo> {
    return this._api.get<ILogInfo>("/logs/latest");
  }

  public getArchiveLogFiles(): Promise<string[]> {
    return this._api.get<string[]>("/logs/archive");
  }

  public getArchivedLog(filename: string): Promise<ILogInfo> {
    return this._api.get<ILogInfo>("/logs/archive/" + filename);
  }
}
