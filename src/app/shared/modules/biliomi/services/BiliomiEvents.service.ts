///<reference path="../../../classes/interfaces/EventSource.d.ts"/>

import {EventEmitter, Injectable} from "@angular/core";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {UriUtils} from "../../tools/UriUtils";
import {StringUtils} from "../../tools/StringUtils";
import {Consumer, Runnable} from "../../tools/FunctionalInterface";
import {Subscription} from "rxjs/Subscription";
import {BiliomiApiService} from "./BiliomiApi.service";
import IEventSource = sse.IEventSource;
import IEvent = Biliomi.IEvent;
import IOnMessageEvent = sse.IOnMessageEvent;
import IRestAuthorizationResponse = Biliomi.IRestAuthorizationResponse;

@Injectable()
export class BiliomiEventsService {
  private _api: BiliomiApiService;
  private _eventSource: IEventSource;
  private _outboundEvents: EventEmitter<IEvent>;

  constructor(api: BiliomiApiService) {
    this._api = api;
    this._outboundEvents = new EventEmitter<IEvent>();
  }

  public get isConnected(): boolean {
    return this._eventSource != null && this._eventSource.readyState == this._eventSource.OPEN;
  }

  public get isConnecting(): boolean {
    return this._eventSource != null && this._eventSource.readyState == this._eventSource.CONNECTING;
  }

  public async connect() {
    if (this.isConnected || this.isConnecting) {
      // Do nothing when already connected
      return;
    }


    this._eventSource = new EventSource(await this.getEventsUri());
    this._eventSource.addEventListener("message", (e: IOnMessageEvent) => {
      if (StringUtils.isNotEmpty(e.data)) {
        this._outboundEvents.emit(JSON.parse(e.data));
      }
    });

    this._eventSource.addEventListener("error", async () => {
      this.disconnect();
      let t = setTimeout(() => {
        this.connect();
        clearTimeout(t);
      }, 1e4);
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

  private async getEventsUri(): Promise<string> {
    let shortLivedTokenResponse: IRestAuthorizationResponse = await this._api.get<IRestAuthorizationResponse>("/events/token");

    if (shortLivedTokenResponse == null) {
      throw new Error("Unable to get short lived token for /events, any further retries will be halted");
    }

    let url: string = await this._api.getApiUriFor("/events");
    let qm: Map<string, any> = new Map<string, any>()
      .set("token", shortLivedTokenResponse.AuthorizationToken);

    return UriUtils.appendQueryString(url, qm);
  }
}
