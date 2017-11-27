import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {StringUtils} from "../../../ts-utilities/StringUtils";
import {CachedModelRestClient} from "../../classes/CachedModelRestClient";
import IGame = Biliomi.IGame;

@Injectable()
export class GamesClient extends CachedModelRestClient<IGame> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/games");
  }

  public getCacheSearch(query: string): IGame[] {
    if (StringUtils.isNotEmpty(query)) {
      return this._cache.get()
        .filter((game: IGame) => StringUtils.containsIgnoreCase(game.Name, query))
    }
    return this._cache.get();
  }
}
