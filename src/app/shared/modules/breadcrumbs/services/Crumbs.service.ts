import {Injectable, OnDestroy} from "@angular/core";
import {ActivatedRoute, NavigationEnd, NavigationStart, PRIMARY_OUTLET, Router, RouterEvent} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Crumb} from "../classes/interfaces/BreadCrumb";
import {RouterUtils} from "../../tools/RouterUtils";
import {Dictionary} from "../../tools/FunctionalInterface";

@Injectable()
export class CrumbsService implements OnDestroy {
  private _currentCrumbs: Crumb[] = [];
  private _activatedRoute: ActivatedRoute;
  private _routerEventsSub: Subscription;
  private _crumbVariables: Map<string, string> = new Map<string, string>();

  public get currentCrumbs(): Crumb[] {
    return this._currentCrumbs;
  }

  constructor(activatedRoute: ActivatedRoute, router: Router) {
    this._activatedRoute = activatedRoute;

    this._updateCrumbs();
    this._routerEventsSub = router.events
      .filter((e: RouterEvent) => e instanceof NavigationEnd)
      .subscribe(() => this._updateCrumbs());
  }

  public ngOnDestroy(): void {
    if (this._routerEventsSub) {
      this._routerEventsSub.unsubscribe();
    }
  }

  public updateVariables(variables: Dictionary) {
    Object.keys(variables).forEach((k: string) => this._crumbVariables.set(k, variables[k]));
    this._updateCrumbs();
  }

  private _updateCrumbs() {
    let root: ActivatedRoute = this._activatedRoute.root;
    this._currentCrumbs = this._renderCrumbs(root);
  }

  private _renderCrumbs(route: ActivatedRoute, breadCrumbs: Crumb[] = []): Crumb[] {
    const ROUTE_DATA_DISPLAY_NAME: string = "crumbName";

    // get the child routes
    let children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadCrumbs;
    }

    // iterate over each children
    for (let child of children) {
      // verify primary route
      if (child.outlet === PRIMARY_OUTLET) {
        // verify the custom data property ROUTE_DATA_DISPLAY_NAME is specified on the route
        if (child.snapshot != null && child.snapshot.data.hasOwnProperty(ROUTE_DATA_DISPLAY_NAME)) {
          // get the route's URL segment
          let routeURL: string = RouterUtils.joinUrlSegments(child.snapshot.url);

          // Do not add empty segments
          if (breadCrumbs.length === 0 || routeURL.length > 0) {
            let url = RouterUtils.routeToUrl(child);

            // Variable replacement
            let name: string = child.snapshot.data[ROUTE_DATA_DISPLAY_NAME];
            if (name.startsWith(":") && this._crumbVariables.has(name.substr(1))) {
              name = this._crumbVariables.get(name.substr(1));
            }

            // add breadcrumb
            breadCrumbs.push({
              name: name,
              params: (url.length !== 1 ? child.snapshot.params : undefined),
              queryParams: child.snapshot.queryParams,
              url: url
            });
          }
        }

        // recursive
        return this._renderCrumbs(child, breadCrumbs);
      }
    }

    return [];
  }
}
