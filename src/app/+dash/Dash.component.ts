import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {DASH_ROUTE} from "../Main.module";

@Component({
  selector: "dash-page",
  templateUrl: require("./Dash.template.pug")
})
export class DashComponent implements AfterViewInit {

  @ViewChild("sideNav")
  private sideNav: MatSidenav;
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public ngAfterViewInit() {
    // The nav drawer should close after the router has ended navigation
    this._router.events
      .filter((e:RouterEvent) => e instanceof NavigationEnd)
      .subscribe((e:NavigationEnd) => this.sideNav.opened = false);

    if (this._router.url === "/dash") {
      this._router.navigateByUrl(DASH_ROUTE)
    }
  }
}
