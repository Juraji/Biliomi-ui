import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {NavigationCancel, NavigationEnd, NavigationStart, Router, RouterEvent} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: "page-loading-bar",
  templateUrl: require("./PageLoadingBar.template.html")
})
export class PageLoadingBarComponent implements OnInit, OnDestroy {
  private _router: Router;
  private _loading: boolean = false;
  private _routerEventsSub: Subscription;

  @HostBinding("hidden")
  public get shouldHide(): boolean {
    return !this._loading;
  }

  constructor(router: Router) {
    this._router = router;
  }

  public ngOnInit() {
    this._routerEventsSub = this._router.events.subscribe((e: RouterEvent) => this._onRouterEvent(e));
  }

  public ngOnDestroy() {
    if (this._routerEventsSub) {
      this._routerEventsSub.unsubscribe();
    }
  }

  private _onRouterEvent(e: RouterEvent) {
    switch (e.constructor) {
      case NavigationStart:
        this._loading = true;
        break;
      case NavigationCancel:
      case NavigationEnd:
        this._loading = false;
        break;
    }
  }
}
