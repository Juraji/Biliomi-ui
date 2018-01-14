import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IInvestmentRecord = Biliomi.IInvestmentRecord;

@Injectable()
export class InvestmentRecordsClient extends ModelRestClient<IInvestmentRecord> {
  constructor(api: BiliomiApiService) {
    super(api, "/games/investmentrecords");
  }
}
