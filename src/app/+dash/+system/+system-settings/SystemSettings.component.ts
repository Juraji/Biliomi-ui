import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {
  COMPONENT_TEMPLATE,
  RedirectToFirstChildComponent
} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";

@Component({
  selector: "system-settings-page",
  templateUrl: COMPONENT_TEMPLATE
})
export class SystemSettingsComponent extends RedirectToFirstChildComponent {
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super("/dash/system/system-settings", router, activatedRoute);
  }
}
