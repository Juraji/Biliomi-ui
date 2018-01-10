import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IAdventureSettings = Biliomi.IAdventureSettings;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AdventureSettingsClient extends SettingsRestClient<IAdventureSettings> implements IAdventureSettings {
  public JoinTimeout: number;
  public MinimumBet: number;
  public MaximumBet: number;
  public Cooldown: number;
  public WinMultiplier: number;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/games/settings/adventure");
  }
}
