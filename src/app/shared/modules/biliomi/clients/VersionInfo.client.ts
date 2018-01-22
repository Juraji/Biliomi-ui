import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../classes/abstract/SettingsRestClient";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../services/BiliomiApi.service";
import {DatePipe} from "../../../pipes/Date.pipe";
import IVersionInfo = Biliomi.IVersionInfo;

@Injectable()
export class VersionInfoClient extends SettingsRestClient<IVersionInfo> implements IVersionInfo {
  public BuildDate: string;
  public Version: string;

  constructor(api: BiliomiApiService) {
    super(api, "/version");
  }

  public async load(): Promise<void> {
    await super.load(true);
    this.BuildDate = "Build date: " + new DatePipe().transform(this.BuildDate);
    this.Version = "Biliomi " + this.Version;
  }

  public async save(): Promise<Biliomi.IVersionInfo> {
    throw Error("Save action is not allowed for version info");
  }
}
