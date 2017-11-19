import {BiliomiApiService} from "../services/BiliomiApi.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

export abstract class SettingsRestClient<T> {
  private _api: BiliomiApiService;
  private _baseResourceUri: string;
  private _isLoaded: boolean;
  private _loadPromise: Promise<void>;
  private _updateInterval: number;
  private _updateSub: Subscription;

  constructor(api: BiliomiApiService, baseResourceUri: string, updateInterval?: number) {
    this._api = api;
    this._baseResourceUri = baseResourceUri;
    this._updateInterval = updateInterval;
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  public load(refresh: boolean = false): Promise<void> {
    if (this._updateSub == null && this._updateInterval != null && this._updateInterval > 0) {
      this._updateSub = Observable.interval(this._updateInterval).subscribe(() => this.load(true))
    }
    if ((!this._isLoaded || refresh) && this._loadPromise == null) {
      // Cache the actual load promise in a local variable to return to subsequent callers,
      // so the API doesn't get flooded with requests by concurrent calls
      this._loadPromise = this._load();
      this._loadPromise.then(() => this._loadPromise = null);
    }

    return this._loadPromise;
  }

  public save(): Promise<T> {
    return this._api.put(this._baseResourceUri, this);
  }

  private async _load(): Promise<void> {
    let data: T = await this._api.get<T>(this._baseResourceUri);
    if (data != null) {
      Object.assign(this, data);
      this._isLoaded = true;
    }
  }
}
