import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import ITemplate = Biliomi.ITemplate;
import {BiliomiApiService} from "../../services/BiliomiApi.service";

@Injectable()
export class TemplatesClient extends ModelRestClient<ITemplate> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/templates");
  }

  public getByKey(key: string): Promise<ITemplate> {
    return this._api.get(this.baseResourceUri + "/bykey/" + key);
  }
}
