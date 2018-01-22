import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {RouterUtils} from "../modules/tools/RouterUtils";

@Component({
  selector: "route-tabs",
  templateUrl: require("./RouteTabs.template.pug")
})
export class RouteTabsComponent implements OnInit {
  private _relativeTo: ActivatedRoute;
  private _routes: Routes;
  private _router: Router;

  @Input("routes")
  public get routes(): Routes {
    return this._routes;
  }

  public set routes(routes: Routes) {
    this._routes = routes;
  }

  @Input("relativeTo")
  public set relativeTo(activatedRoute: ActivatedRoute) {
    this._relativeTo = activatedRoute;
  }

  constructor(router: Router) {
    this._router = router;
  }

  public ngOnInit(): void {
    let firstRoutePath = this.routes[0].path;
    if (!RouterUtils.routeEndsWith(this._relativeTo, firstRoutePath)) {
      this._router.navigate([firstRoutePath], {relativeTo: this._relativeTo});
    }
  }

  public navigateToTab(i: number) {
    this._router.navigate([this.routes[i].path], {relativeTo: this._relativeTo});
  }
}
