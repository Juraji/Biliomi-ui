import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {RouterRedirector} from "../../shared/classes/RouterRedirector";

@Component({
  selector: "commands-page",
  templateUrl: require("./Commands.template.pug")
})
export class CommandsComponent implements OnInit, OnDestroy {
  private _router: Router;
  private _activatedRoute: ActivatedRoute;
  private childRoutes: Route[] = [];
  private _redirector: RouterRedirector;

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this._router = router;
    this._activatedRoute = activatedRoute;
  }

  public ngOnInit() {
    const componentUrl = "/dash/commands";
    this.childRoutes = this._activatedRoute.routeConfig.children;
    this._redirector = new RouterRedirector(this._router, componentUrl, componentUrl + "/" + this.childRoutes[0].path).start();
  }

  public ngOnDestroy() {
    this._redirector.stop();
  }
}
