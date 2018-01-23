import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import ITamagotchi = Biliomi.ITamagotchi;

@Injectable()
export class TamagotchisClient extends ModelRestClient<ITamagotchi> {
  constructor(api: BiliomiApiService) {
    super(api, "/games/tamagotchis");
  }
}
