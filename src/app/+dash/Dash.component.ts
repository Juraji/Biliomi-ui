import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {MatSidenav, MatSnackBar} from "@angular/material";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {DASH_ROUTE} from "../Main.module";
import {BiliomiApiService} from "../shared/modules/biliomi/services/BiliomiApi.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BiliomiEventsService} from "../shared/modules/biliomi/services/BiliomiEvents.service";
import {Biliomi} from "../shared/modules/biliomi/classes/interfaces/Biliomi";
import {StringUtils} from "../shared/modules/ts-utilities/StringUtils";
import {AuthService} from "../shared/services/Auth.service";
import {BILIOMI_EVENTS} from "../shared/modules/biliomi/classes/constants/BiliomiApiVariables";
import ITwitchFollowEvent = Biliomi.ITwitchFollowEvent;
import ITwitchSubscriberEvent = Biliomi.ITwitchSubscriberEvent;
import ITwitchHostInEvent = Biliomi.ITwitchHostInEvent;
import IIrcChatMessageEvent = Biliomi.IIrcChatMessageEvent;
import ITwitchBitsEvent = Biliomi.ITwitchBitsEvent;

@Component({
  selector: "dash-page",
  templateUrl: require("./Dash.template.pug"),
  styleUrls: [require("./Dash.less").toString()]
})
export class DashComponent implements AfterViewInit {

  @ViewChild("sideNav")
  private sideNav: MatSidenav;
  private _router: Router;
  private _api: BiliomiApiService;
  private _auth: AuthService;
  private _matSnackBar: MatSnackBar;

  constructor(router: Router, api: BiliomiApiService, events: BiliomiEventsService, auth: AuthService, matSnackBar: MatSnackBar) {
    this._router = router;
    this._api = api;
    this._auth = auth;
    this._matSnackBar = matSnackBar;

    // Subscribe to Api errors in order to display them in a snackbar
    this._api.postRequestErrorInterceptor.subscribe((e: HttpErrorResponse) => this._onHttpError(e));

    // Connect to Biliomi's events service and hook the appropriate subscribers
    events.connect();
    events.subscribe((e: ITwitchFollowEvent) => this._onBiliomiTwitchFollowEvent(e), [BILIOMI_EVENTS.TWITCH_FOLLOW_EVENT]);
    events.subscribe((e: ITwitchSubscriberEvent) => this._onBiliomiTwitchSubscriberEvent(e), [BILIOMI_EVENTS.TWITCH_SUBSCRIBER_EVENT]);
    events.subscribe((e: ITwitchBitsEvent) => this._onBiliomiTwitchBitsEvent(e), [BILIOMI_EVENTS.TWITCH_BITS_EVENT]);
    events.subscribe((e: ITwitchHostInEvent) => this._onBiliomiTwitchHostInEvent(e), [BILIOMI_EVENTS.TWITCH_HOST_IN_EVENT]);
    events.subscribe((e: IIrcChatMessageEvent) => this._onBiliomiMessageEvent(e), [BILIOMI_EVENTS.IRC_CHAT_MESSAGE_EVENT])
  }

  public ngAfterViewInit() {
    // The nav drawer should close after the router has ended navigation
    this._router.events
      .filter((e: RouterEvent) => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.sideNav.opened = false);

    if (this._router.url === "/dash") {
      this._router.navigateByUrl(DASH_ROUTE)
    }
  }

  // Global event subscriber methods
  private _onHttpError(e: HttpErrorResponse) {
    this._matSnackBar.open("An error occurred while comunicating with Biliomi! (" + e.message + ")", "Ok", {duration: 1e4});
  }

  private _onBiliomiTwitchFollowEvent(e: ITwitchFollowEvent) {
    this._matSnackBar.open("New follower: " + e.Username + "!", "Ok");
  }

  private _onBiliomiTwitchSubscriberEvent(e: ITwitchSubscriberEvent) {
    let prefix: string = (e.IsResub ? "Recurring subscriber" : "New subscriber");
    this._matSnackBar.open(prefix + ": " + e.Username + "! (plan: " + e.SubPlan + ")", "Ok");
  }

  private _onBiliomiTwitchBitsEvent(e: ITwitchBitsEvent) {
    this._matSnackBar.open(e.Username + " cheered " + e.BitsUsed + " bits, making it a total of " + e.TotalBitsUsed + " bits cheered in this channel!", "Ok")
  }

  private _onBiliomiTwitchHostInEvent(e: ITwitchHostInEvent) {
    this._matSnackBar.open("Incoming host: " + e.ChannelName + "!", "Ok")
  }

  private _onBiliomiMessageEvent(e: IIrcChatMessageEvent) {
    if (StringUtils.containsIgnoreCase(e.Message, this._auth.username)) {
      this._matSnackBar.open("You've been mentioned in the chat by " + e.Username + ".", "Ok", {duration: 1e4});
    }
  }
}
