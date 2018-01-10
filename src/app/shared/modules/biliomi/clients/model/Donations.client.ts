import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import IDonation = Biliomi.IDonation;

@Injectable()
export class DonationsClient extends ModelRestClient<IDonation> {
  constructor(api: BiliomiApiService) {
    super(api, "/registers/donations");
  }

  public saveAsCommand(username: string, donation: string): Promise<boolean> {
    return this._api.postCommand("donations", "add", username, donation);
  }
}
