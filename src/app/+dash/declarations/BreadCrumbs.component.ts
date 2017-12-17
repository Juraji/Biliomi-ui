import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router, RouterEvent} from "@angular/router";

interface IBreadCrumb {
  displayName: string;
  params: Params,
  queryParams: Params,
  url: string;
}

@Component({
  selector: "bread-crumbs-component",
  templateUrl: require("./BreadCrumbs.template.pug"),
  styleUrls: [require("./BreadCrumbs.less").toString()]
})
export class BreadCrumbsComponent implements OnInit {
  private _activatedRoute: ActivatedRoute;
  private _router: Router;
  public currentBreadCrumbs: IBreadCrumb[] = [];

  constructor(activatedRoute: ActivatedRoute, router: Router) {
    this._activatedRoute = activatedRoute;
    this._router = router;
  }

  public ngOnInit() {
    this._updateBreadCrumbs();

    this._router.events
      .filter((e: RouterEvent) => e instanceof NavigationEnd)
      .subscribe(() => this._updateBreadCrumbs());
  }

  private _updateBreadCrumbs() {
    let root: ActivatedRoute = this._activatedRoute.root;
    this.currentBreadCrumbs = this._renderBreadCrumbs(root);
  }

  private _renderBreadCrumbs(route: ActivatedRoute, url: string = "", breadCrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    const ROUTE_DATA_DISPLAY_NAME: string = "breadCrumbName";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadCrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_DISPLAY_NAME)) {
        return this._renderBreadCrumbs(child, url, breadCrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      // Do not add empty segments
      if (breadCrumbs.length == 0 || routeURL.length > 0) {
        //append route URL to URL
        url += `/${routeURL}`;

        //add breadcrumb
        breadCrumbs.push({
          displayName: child.snapshot.data[ROUTE_DATA_DISPLAY_NAME],
          params: (url.length != 1 ? child.snapshot.params : undefined),
          queryParams: child.snapshot.queryParams,
          url: url
        });
      }

      //recursive
      return this._renderBreadCrumbs(child, url, breadCrumbs);
    }

    return [];
  }
}
