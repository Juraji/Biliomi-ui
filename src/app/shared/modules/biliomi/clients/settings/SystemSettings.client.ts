import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import ISystemSettings = Biliomi.ISystemSettings;

@Injectable()
export class SystemSettingsClient extends SettingsRestClient<ISystemSettings> implements ISystemSettings {
  public Type: string;
  public Muted: boolean;
  public EnableWhispers: boolean;

  constructor(api: BiliomiApiService) {
    super(api, "/core/settings/system");
  }
}
