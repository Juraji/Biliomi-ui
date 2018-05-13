import { NavigationEnd, Router, RouterEvent, UrlSegment } from "@angular/router";
import { Subscription } from "rxjs";
import { RouterUtils } from "../modules/tools/RouterUtils";
import { filter } from "rxjs/operators";

export class RouterRedirector {
    private readonly _router: Router;
    private readonly _from: string;
    private readonly _to: string;
    private _navigationSubscription: Subscription;

    constructor(router: Router, from: string | UrlSegment[], to: string | UrlSegment[]) {
        this._router = router;

        this._from = RouterRedirector.url(from);
        this._to = RouterRedirector.url(to);
    }

    private static url(url: UrlSegment[] | string): string {
        return (Array.isArray(url) ? RouterUtils.joinUrlSegments(url) : url);
    }

    public start() {
        this._navigationSubscription = this._router.events
            .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
            .pipe(filter((e: NavigationEnd) => e.urlAfterRedirects === this._from))
            .subscribe(() => this.performRedirect());

        if (this._router.url === this._from) {
            this.performRedirect();
        }
    }

    public stop() {
        this._navigationSubscription.unsubscribe();
    }

    private performRedirect() {
        this._router.navigateByUrl(this._to, {replaceUrl: true});
    }
}
