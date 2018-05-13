import { Injectable } from "@angular/core";
import { ModelRestClient } from "../../classes/abstract/ModelRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import ITemplate = Biliomi.ITemplate;

@Injectable()
export class TemplatesClient extends ModelRestClient<ITemplate> {
    constructor(api: BiliomiApiService) {
        super(api, "/core/templates");
    }

    public getByKey(key: string): Promise<ITemplate> {
        return this._api.get(this.baseResourceUri + "/bykey/" + key);
    }
}
