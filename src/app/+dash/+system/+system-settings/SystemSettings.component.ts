import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectToFirstChildComponent} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";

@Component({
  selector: "system-settings-page",
  templateUrl: require("../../../shared/classes/abstract/RedirectToFirstChildComponentTemplate.pug")
})
export class SystemSettingsComponent extends RedirectToFirstChildComponent {
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super("/dash/system/system-settings", router, activatedRoute);
  }
}
