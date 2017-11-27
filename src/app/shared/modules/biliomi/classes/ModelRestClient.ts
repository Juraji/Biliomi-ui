import {BiliomiApiService} from "../services/BiliomiApi.service";
import {HttpParams} from "@angular/common/http";

export abstract class ModelRestClient<T> {
  protected _api: BiliomiApiService;
  private _baseResourceUri: string;

  constructor(api: BiliomiApiService, baseResourceUri: string) {
    this._api = api;
    this._baseResourceUri = baseResourceUri;
  }

  public get(id: number, params?: HttpParams): Promise<T> {
    return this._api.get<T>(this._baseResourceUri + "/" + id, params);
  }

  public getList(params?: HttpParams): Promise<T[]> {
    return this._api.get<T[]>(this._baseResourceUri, params);
  }

  public post(obj: T, params?: HttpParams): Promise<T> {
    return this._api.post<T, T>(this._baseResourceUri, obj, params);
  }

  public put(id: number, obj: T, params?: HttpParams): Promise<T> {
    return this._api.put<T>(this._baseResourceUri + "/" + id, obj, params);
  }

  // noinspection ReservedWordAsName
  public delete(id: number, params?: HttpParams): Promise<boolean> {
    return this._api.delete(this._baseResourceUri + "/" + id, params);
  }
}
