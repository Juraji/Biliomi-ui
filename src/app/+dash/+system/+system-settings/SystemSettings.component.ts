import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  COMPONENT_TEMPLATE,
  RedirectToFirstChildComponent
} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";

@Component({
  selector: "system-settings-page",
  templateUrl: COMPONENT_TEMPLATE
})
export class SystemSettingsComponent extends RedirectToFirstChildComponent {
  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
}
