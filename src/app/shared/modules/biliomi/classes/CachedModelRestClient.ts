import {ModelRestClient} from "./ModelRestClient";
import {BiliomiApiService} from "../services/BiliomiApi.service";
import {ListCache} from "./ListCache";
import {HttpParams} from "@angular/common/http";
import {SortBuilder} from "./SortBuilder";

export abstract class CachedModelRestClient<T> extends ModelRestClient<T> {
  protected _cache: ListCache<T> = new ListCache<T>();

  constructor(api: BiliomiApiService, baseResourceUri: string) {
    super(api, baseResourceUri);
  }

  public async load(refresh?: boolean, sorting?: SortBuilder, params?: HttpParams): Promise<T[]> {
    if (!this._cache.hasData() || refresh) {
      this._cache.set(await super.getList(sorting, params));
    }

    return this._cache.get();
  }

  public getCache(): T[] {
    return this._cache.get();
  }
}
