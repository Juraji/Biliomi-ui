import {ModelRestClient} from "./ModelRestClient";
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {ListCache} from "../ListCache";
import {SortBuilder} from "../SortBuilder";
import {Predicate} from "../../../tools/FunctionalInterface";
import {FilterBuilder} from "../FilterBuilder";
import {Biliomi} from "../interfaces/Biliomi";
import IPaginatedResponse = Biliomi.IPaginatedResponse;

export abstract class CachedModelRestClient<T> extends ModelRestClient<T> {
  private _loadPromise: Promise<T[]>;
  protected _cache: ListCache<T> = new ListCache<T>();

  constructor(api: BiliomiApiService, baseResourceUri: string) {
    super(api, baseResourceUri);
  }

  public load(refresh?: boolean, sorting?: SortBuilder, filters?: FilterBuilder, params?: Map<string, any>): Promise<T[]> {
    // Cache the actual load promise in a local variable to return to subsequent callers,
    // so the API doesn't get flooded with requests by concurrent calls
    if ((!this._cache.hasData() || refresh) && this._loadPromise == null) {
      this._loadPromise = (async () => {
        let res: IPaginatedResponse<T> = await super.getList(sorting, filters, params);
        if (res != null) {
          this._cache.set(res.Entities);
        }
        return this._cache.get();
      })();
    }

    return this._loadPromise;
  }

  public getCache(): T[] {
    return this._cache.get();
  }

  public searchCacheById(id: number) {
    return this._cache.get()
      .find((t: any) => t.hasOwnProperty("Id") && t.Id === id);
  }

  public searchCacheByPredicate(predicate: Predicate<T>): T[] {
    if (this._cache.hasData() && predicate != null) {
      return this._cache.get().filter(predicate);
    } else {
      return this._cache.get();
    }
  }
}
