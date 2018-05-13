import { Injectable } from "@angular/core";
import { ModelRestClient } from "../../classes/abstract/ModelRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import ICommand = Biliomi.ICommand;

@Injectable()
export class CommandsClient extends ModelRestClient<ICommand> {
    constructor(api: BiliomiApiService) {
        super(api, "/core/commands");
    }
}
