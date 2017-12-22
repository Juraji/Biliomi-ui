import {Injectable} from "@angular/core";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {StringUtils} from "../../../tools/StringUtils";
import {CachedModelRestClient} from "../../classes/CachedModelRestClient";
import {Predicate} from "../../../tools/FunctionalInterface";
import IGame = Biliomi.IGame;

@Injectable()
export class GamesClient extends CachedModelRestClient<IGame> {
  constructor(api: BiliomiApiService) {
    super(api, "/core/games");
  }

  public searchCache(query: string): IGame[] {
    let predicate: Predicate<IGame> = (g: IGame) => StringUtils.containsIgnoreCase(g.Name, query);
    return super.searchCacheByPredicate(predicate);
  }

  public setAsCurrentGame(game: IGame) {
    if (game != null) {
      this._api.postCommand("channel", "game", game.Name);
    }
  }
}
