import {Injectable} from "@angular/core";
import {ModelRestClient} from "../../classes/ModelRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {ListCache} from "../../classes/ListCache";
import {StringUtils} from "../../../ts-utilities/StringUtils";
import IGame = Biliomi.IGame;

@Injectable()
export class GamesClient extends ModelRestClient<IGame> {
  private _cache: ListCache<IGame> = new ListCache<IGame>();

  constructor(api: BiliomiApiService) {
    super(api, "/core/games");
  }

  public async load(refresh?: boolean): Promise<IGame[]> {
    if (!this._cache.hasData() || refresh) {
      let data: IGame[] = await super.getList();
      if (data != null) {
        this._cache.set(data.sort(GamesClient.gameSort));
      } else {
        this._cache.clear();
      }
    }

    return this._cache.get();
  }

  public getCacheSearch(query: string): IGame[] {
    if (StringUtils.isNotEmpty(query)) {
      query = query.toLowerCase();
      return this._cache.get().filter((game: IGame) => game.Name.toLowerCase().indexOf(query) > -1)
    }
    return this._cache.get();
  }

  private static gameSort(a: IGame, b: IGame): number {
    return a.Name.localeCompare(b.Name);
  }
}
