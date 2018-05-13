import { Injectable } from "@angular/core";
import { ModelRestClient } from "../../classes/abstract/ModelRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import IQuote = Biliomi.IQuote;

@Injectable()
export class QuotesClient extends ModelRestClient<IQuote> {
    constructor(api: BiliomiApiService) {
        super(api, "/chat/quotes");
    }

    performAddQuote(username: string, message: string): Promise<boolean> {
        return this._api.postCommand("quotes", "add", username, message);
    }
}
