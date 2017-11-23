///<reference path="../../../classes/interfaces/EventSource.d.ts"/>

import {EventEmitter, Injectable} from "@angular/core";
import {ConfigService} from "../../../services/Config.service";
import {AuthService} from "../../../services/Auth.service";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {IConfig} from "../../../classes/interfaces/IConfig.interface";
import {UriUtils} from "../../ts-utilities/UriUtils";
import {StringUtils} from "../../ts-utilities/StringUtils";
import {Consumer, Runnable} from "../../ts-utilities/FunctionalInterface";
import {Subscription} from "rxjs/Subscription";
import {BILIOMI_API} from "../classes/constants/BiliomiApiVariables";
import IEventSource = sse.IEventSource;
import IEvent = Biliomi.IEvent;
import IOnMessageEvent = sse.IOnMessageEvent;

@Injectable()
export class BiliomiEventsService {
  private _configService: ConfigService;
  private _auth: AuthService;
  private _eventSource: IEventSource;
  private _outboundEvents: EventEmitter<IEvent>;

  constructor(configService: ConfigService, auth: AuthService) {
    this._configService = configService;
    this._auth = auth;
    this._outboundEvents = new EventEmitter<IEvent>();
  }

  public get isConnected(): boolean {
    return this._eventSource != null && this._eventSource.readyState == this._eventSource.OPEN;
  }

  public get isConnecting(): boolean {
    return this._eventSource != null && this._eventSource.readyState == this._eventSource.CONNECTING;
  }

  public async connect() {
    if (this.isConnected || this.isConnecting || !this._auth.isTokenValid) {
      // Do nothing when already connected or auth is invalid
      return;
    }

    let config: IConfig = await this._configService.getConfig();
    let apiBase: string = config.apiBase;
    let qm: Map<string, any> = new Map<string, any>();
    qm.set("token", this._auth.apiToken);

    let eventsUri: string = UriUtils.appendQueryString(apiBase + BILIOMI_API.API_URI_PREFIX + BILIOMI_API.EVENTS_ENDPOINT, qm);
    this._eventSource = new EventSource(eventsUri);
    this._eventSource.addEventListener("message", (e: IOnMessageEvent) => {
      if (StringUtils.isNotEmpty(e.data)) {
        this._outboundEvents.emit(JSON.parse(e.data));
      }
    });
  }

  public disconnect() {
    this._eventSource.close();
    this._eventSource = null;
  }

  public subscribe(onEvent: Consumer<IEvent>, filter?: string[], onError?: Consumer<any>, onComplete?: Runnable): Subscription {
    if (filter != null) {
      return this._outboundEvents
        .filter((e: IEvent) => filter.indexOf(e.EventType) > -1)
        .subscribe(onEvent, onError, onComplete);
    } else {
      return this._outboundEvents.subscribe(onEvent, onError, onComplete);
    }
  }
}
