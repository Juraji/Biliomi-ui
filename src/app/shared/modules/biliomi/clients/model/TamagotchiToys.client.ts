import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/abstract/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import ITamagotchiToy = Biliomi.ITamagotchiToy;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import ITamagotchi = Biliomi.ITamagotchi;

@Injectable()
export class TamagotchiToysClient extends ModelRestClient<ITamagotchiToy> {
  constructor(api: BiliomiApiService) {
    super(api, "/games/tamagotchis/toys");
  }

  public assignToy(tamagotchi: ITamagotchi, toy: ITamagotchiToy): Promise<ITamagotchi> {
    return this._api.post(this.baseResourceUri + "/assign/" + tamagotchi.Id, toy);
  }
}
