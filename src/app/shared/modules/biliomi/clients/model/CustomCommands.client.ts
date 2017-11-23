import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import ICustomCommand = Biliomi.ICustomCommand;

@Injectable()
export class CustomCommandsClient extends ModelRestClient<ICustomCommand> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/customcommands");
  }
}
