import {Component} from "@angular/core";
import {
  COMPONENT_TEMPLATE,
  RedirectToFirstChildComponent
} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "users-page",
  templateUrl: COMPONENT_TEMPLATE
})
export class UsersComponent extends RedirectToFirstChildComponent {
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super("/dash/system/users", router, activatedRoute);
  }
}
