import {ActivatedRoute, Route, Router} from "@angular/router";
import {RouterRedirector} from "../RouterRedirector";
import {OnDestroy, OnInit} from "@angular/core";

export abstract class RedirectToFirstChildComponent implements OnInit, OnDestroy {
  private _componentUrl: string;
  private _router: Router;
  private _activatedRoute: ActivatedRoute;
  private _redirector: RouterRedirector;
  public childRoutes: Route[] = [];

  constructor(componentUrl: string, router: Router, activatedRoute: ActivatedRoute) {
    this._componentUrl = componentUrl;
    this._router = router;
    this._activatedRoute = activatedRoute;
  }

  public ngOnInit() {
    this.childRoutes = this._activatedRoute.routeConfig.children;
    this._redirector = new RouterRedirector(this._router, this._componentUrl, this._componentUrl + "/" + this.childRoutes[0].path);
    this._redirector.start();
  }

  public ngOnDestroy() {
    this._redirector.stop();
  }
}
