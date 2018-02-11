import {ActivatedRoute, Route} from "@angular/router";

export const REDIRECT_COMPONENT_TEMPLATE: string = require("./RedirectToFirstChildComponentTemplate.html");

export abstract class RedirectToFirstChildComponent {
  private _activatedRoute: ActivatedRoute;
  private _childRoutes: Route[] = [];

  public get activatedRoute(): ActivatedRoute {
    return this._activatedRoute;
  }

  public get childRoutes(): Route[] {
    return this._childRoutes;
  }

  constructor(activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute;
    this._childRoutes = activatedRoute.routeConfig.children.filter((child: Route) => !child.data.hideFromMenu);
  }
}
