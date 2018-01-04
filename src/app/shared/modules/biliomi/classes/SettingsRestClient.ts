import {BiliomiApiService} from "../services/BiliomiApi.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {EventEmitter} from "@angular/core";

export abstract class SettingsRestClient<T> {
  private _api: BiliomiApiService;
  private _baseResourceUri: string;
  private _isLoaded: boolean;
  private _loadPromise: Promise<void>;
  private _updateInterval: number;
  private _updateSub: Subscription;
  private _afterSave: EventEmitter<boolean>;

  constructor(api: BiliomiApiService, baseResourceUri: string, updateInterval?: number) {
    this._api = api;
    this._baseResourceUri = baseResourceUri;
    this._updateInterval = updateInterval;
    this._afterSave = new EventEmitter<boolean>();
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  public get afterSave(): EventEmitter<boolean> {
    return this._afterSave;
  }

  protected get api(): BiliomiApiService {
    return this._api;
  }

  public load(refresh: boolean = false): Promise<void> {
    if (this._updateSub == null && this._updateInterval != null && this._updateInterval > 0) {
      this._updateSub = Observable.interval(this._updateInterval).subscribe(() => this.load(true));
    }
    if ((!this._isLoaded || refresh) && this._loadPromise == null) {
      // Cache the actual load promise in a local variable to return to subsequent callers,
      // so the API doesn't get flooded with requests by concurrent calls
      this._loadPromise = (async () => {
        let data: T = await this._api.get<T>(this._baseResourceUri);
        if (data != null) {
          Object.assign(this, data);
          this._isLoaded = true;
        }
      })();

      this._loadPromise.then(() => this._loadPromise = null);
    }

    return this._loadPromise;
  }

  public async save(): Promise<T> {
    let data: T = await this._api.put<T>(this._baseResourceUri, this);

    if (data != null) {
      Object.assign(this, data);
    }

    this._afterSave.next(data != null);

    return data;
  }
}
