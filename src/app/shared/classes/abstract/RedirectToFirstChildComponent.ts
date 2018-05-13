import { ActivatedRoute, Route } from "@angular/router";

export const REDIRECT_COMPONENT_TEMPLATE: string = require("./RedirectToFirstChildComponentTemplate.html");

export abstract class RedirectToFirstChildComponent {
    constructor(activatedRoute: ActivatedRoute) {
        this._activatedRoute = activatedRoute;
        this._childRoutes = activatedRoute.routeConfig.children.filter((child: Route) => !child.data.hideFromMenu);
    }

    private _activatedRoute: ActivatedRoute;

    public get activatedRoute(): ActivatedRoute {
        return this._activatedRoute;
    }

    private _childRoutes: Route[] = [];

    public get childRoutes(): Route[] {
        return this._childRoutes;
    }
}
