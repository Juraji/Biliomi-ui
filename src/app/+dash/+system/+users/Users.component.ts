import {Component} from "@angular/core";
import {RedirectToFirstChildComponent} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "users-page",
  templateUrl: require("../../../shared/classes/abstract/RedirectToFirstChildComponentTemplate.pug")
})
export class UsersComponent extends RedirectToFirstChildComponent {
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super("/dash/system/users", router, activatedRoute);
  }
}
