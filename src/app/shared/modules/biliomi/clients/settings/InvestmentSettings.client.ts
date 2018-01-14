import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/abstract/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IInvestmentSettings = Biliomi.IInvestmentSettings;

@Injectable()
export class InvestmentSettingsClient extends SettingsRestClient<IInvestmentSettings> implements IInvestmentSettings {
  public InvestmentDuration: number;
  public MinInterest: number;
  public MaxInterest: number;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/games/settings/investments");
  }
}