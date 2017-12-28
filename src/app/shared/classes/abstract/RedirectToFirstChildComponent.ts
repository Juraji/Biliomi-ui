import {ActivatedRoute, Route, Router} from "@angular/router";
import {RouterRedirector} from "../RouterRedirector";
import {OnDestroy, OnInit} from "@angular/core";

export const COMPONENT_TEMPLATE: string = require("./RedirectToFirstChildComponentTemplate.pug");

export abstract class RedirectToFirstChildComponent implements OnInit, OnDestroy {
  private _componentUrl: string;
  private _redirector: RouterRedirector;
  public childRoutes: Route[] = [];

  constructor(componentUrl: string, router: Router, activatedRoute: ActivatedRoute) {
    this._componentUrl = componentUrl;
    this.childRoutes = activatedRoute.routeConfig.children;
    this._redirector = new RouterRedirector(router, this._componentUrl, this._componentUrl + "/" + this.childRoutes[0].path);
  }

  public ngOnInit() {
    this._redirector.start();
  }

  public ngOnDestroy() {
    this._redirector.stop();
  }
}
