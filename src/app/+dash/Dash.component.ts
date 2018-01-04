import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatSidenav, MatSnackBar} from "@angular/material";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {DASH_ROUTE} from "../Main.module";
import {BiliomiApiService} from "../shared/modules/biliomi/services/BiliomiApi.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BiliomiEventsService} from "../shared/modules/biliomi/services/BiliomiEvents.service";
import {Biliomi} from "../shared/modules/biliomi/classes/interfaces/Biliomi";
import {StringUtils} from "../shared/modules/tools/StringUtils";
import {AuthService} from "../shared/services/Auth.service";
import {SubscriptionBucket} from "../shared/classes/SubscriptionBucket";
import {BILIOMI_EVENTS} from "../shared/modules/biliomi/classes/constants/BiliomiApiVariables";
import {RouterRedirector} from "../shared/classes/RouterRedirector";
import {Storage} from "../shared/storage/Storage";
import {ChannelStatusClient} from "../shared/modules/biliomi/clients/ChannelStatus.client";
import ITwitchFollowEvent = Biliomi.ITwitchFollowEvent;
import ITwitchSubscriberEvent = Biliomi.ITwitchSubscriberEvent;
import ITwitchHostInEvent = Biliomi.ITwitchHostInEvent;
import IIrcChatMessageEvent = Biliomi.IIrcChatMessageEvent;
import IChannelStateEvent = Biliomi.IChannelStateEvent;

@Component({
  selector: "dash-page",
  templateUrl: require("./Dash.template.pug"),
  styleUrls: [require("./Dash.less").toString()]
})
export class DashComponent implements OnInit, OnDestroy {

  @ViewChild("sideNav")
  private sideNav: MatSidenav;
  private _router: Router;
  private _api: BiliomiApiService;
  private _auth: AuthService;
  private _matSnackBar: MatSnackBar;
  private _biliomiEventsService: BiliomiEventsService;
  private _subscriptionBucket: SubscriptionBucket = new SubscriptionBucket();
  private _redirector: RouterRedirector;
  private _channelStatusClient: ChannelStatusClient;

  constructor(router: Router,
              api: BiliomiApiService,
              biliomiEventsService: BiliomiEventsService,
              channelStatusClient: ChannelStatusClient,
              auth: AuthService,
              matSnackBar: MatSnackBar) {
    this._router = router;
    this._api = api;
    this._auth = auth;
    this._matSnackBar = matSnackBar;
    this._biliomiEventsService = biliomiEventsService;
    this._channelStatusClient = channelStatusClient;

    // Subscribe to Api errors in order to display them in a snackbar
    this._api.postRequestErrorInterceptor.subscribe((e: HttpErrorResponse) => this._onHttpError(e));
  }

  public ngOnInit() {
    this._subscriptionBucket.add(this._router.events
      .filter((e: RouterEvent) => e instanceof NavigationEnd)
      .subscribe(() => this.sideNav.opened = false));

    this._redirector = new RouterRedirector(this._router, "/dash", DASH_ROUTE);
    this._redirector.start();

    // Connect to Biliomi's events service and hook the appropriate subscribers
    this._biliomiEventsService.connect();

    this._subscriptionBucket
      .add(this._biliomiEventsService.subscribe((e: IChannelStateEvent) => this._onBiliomiChannelStateEvent(e), [BILIOMI_EVENTS.CHANNEL_STATE_EVENT]))
      .add(this._biliomiEventsService.subscribe((e: ITwitchFollowEvent) => this._onBiliomiTwitchFollowEvent(e), [BILIOMI_EVENTS.TWITCH_FOLLOW_EVENT]))
      .add(this._biliomiEventsService.subscribe((e: ITwitchSubscriberEvent) => this._onBiliomiTwitchSubscriberEvent(e), [BILIOMI_EVENTS.TWITCH_SUBSCRIBER_EVENT]))
      .add(this._biliomiEventsService.subscribe((e: ITwitchHostInEvent) => this._onBiliomiTwitchHostInEvent(e), [BILIOMI_EVENTS.TWITCH_HOST_IN_EVENT]))
      .add(this._biliomiEventsService.subscribe((e: IIrcChatMessageEvent) => this._onBiliomiMessageEvent(e), [BILIOMI_EVENTS.IRC_CHAT_MESSAGE_EVENT]));
  }

  public ngOnDestroy() {
    this._subscriptionBucket.unsubscribeAll();
    this._biliomiEventsService.disconnect();
    this._redirector.stop();
  }

  // noinspection JSMethodCanBeStatic
  public get displayTwitchChat(): boolean {
    return Storage.get("displayTwitchChat", false);
  }

  public toggleDisplayTwitchChat() {
    Storage.store("displayTwitchChat", !this.displayTwitchChat);
  }

  // Global event subscriber methods
  private _onHttpError(e: HttpErrorResponse) {
    this._matSnackBar.open("An error occurred while comunicating with Biliomi! (" + e.message + ")", "Ok", {duration: 1e4});
  }

  private _onBiliomiChannelStateEvent(e: IChannelStateEvent) {
    if (e.IsOnline) {
      this._channelStatusClient.load(true);
    }
  }

  private _onBiliomiTwitchFollowEvent(e: ITwitchFollowEvent) {
    this._matSnackBar.open("New follower: " + e.User.DisplayName + "!", "Ok");
  }

  private _onBiliomiTwitchSubscriberEvent(e: ITwitchSubscriberEvent) {
    let prefix: string = (e.IsResub ? "Recurring subscriber" : "New subscriber");
    this._matSnackBar.open(prefix + ": " + e.User.DisplayName + "! (plan: " + e.SubPlan + ")", "Ok");
  }

  private _onBiliomiTwitchHostInEvent(e: ITwitchHostInEvent) {
    this._matSnackBar.open("Incoming host: " + e.ChannelName + "!", "Ok");
  }

  private _onBiliomiMessageEvent(e: IIrcChatMessageEvent) {
    if (StringUtils.containsIgnoreCase(e.Message, this._auth.username)) {
      this._matSnackBar.open("You've been mentioned in the chat by " + e.Username + ".", "Ok", {duration: 1e4});
    }
  }
}
