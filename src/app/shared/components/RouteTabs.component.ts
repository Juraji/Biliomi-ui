import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { RouterUtils } from "../modules/tools/RouterUtils";

@Component({
    selector: "route-tabs",
    templateUrl: require("./RouteTabs.template.html")
})
export class RouteTabsComponent implements OnInit {
    private _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    private _relativeTo: ActivatedRoute;

    @Input("relativeTo")
    public set relativeTo(activatedRoute: ActivatedRoute) {
        this._relativeTo = activatedRoute;
    }

    private _routes: Routes;

    @Input("routes")
    public get routes(): Routes {
        return this._routes;
    }

    public set routes(routes: Routes) {
        this._routes = routes;
    }

    public ngOnInit(): void {
        this.navigateToTab(0);
    }

    public navigateToTab(i: number) {
        const path = this.routes[i].path;
        if (!RouterUtils.routeEndsWith(this._relativeTo, path)) {
            this._router.navigate([path], {
                relativeTo: this._relativeTo,
                replaceUrl: true
            });
        }
    }
}
