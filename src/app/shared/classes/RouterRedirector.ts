import {NavigationEnd, Router, RouterEvent, UrlSegment} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

export class RouterRedirector {
  private _router: Router;
  private _from: string;
  private _to: string;
  private _navigationSubscription: Subscription;

  constructor(router: Router, from: string | UrlSegment[], to: string | UrlSegment[]) {
    this._router = router;

    this._from = RouterRedirector.urlSegmentsToUrl(from);
    this._to = RouterRedirector.urlSegmentsToUrl(to);
  }

  public start(): RouterRedirector {
    this._navigationSubscription = this._router.events
      .filter((e: RouterEvent) => e instanceof NavigationEnd)
      .filter((e: NavigationEnd) => e.urlAfterRedirects === this._from)
      .subscribe((e: NavigationEnd) => this.performRedirect());

    if (this._router.url === this._from) {
      this.performRedirect();
    }

    return this;
  }

  public stop() {
    this._navigationSubscription.unsubscribe();
  }

  private performRedirect() {
    this._router.navigateByUrl(this._to);
  }

  private static urlSegmentsToUrl(url: UrlSegment[] | string): string {
    if (Array.isArray(url)) {
      return url
        .map((segment: UrlSegment) => segment.path)
        .reduce((prev: string, next: string) => prev + "/" + next, "/")
    } else {
      return url;
    }
  }
}
