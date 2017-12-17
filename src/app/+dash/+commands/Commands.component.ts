import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectToFirstChildComponent} from "../../shared/classes/abstract/RedirectToFirstChildComponent";

@Component({
  selector: "commands-page",
  templateUrl: require("../../shared/classes/abstract/RedirectToFirstChildComponentTemplate.pug"),
  styleUrls: [require("./Commands.less").toString()]
})
export class CommandsComponent extends RedirectToFirstChildComponent {

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super("/dash/commands", router, activatedRoute);
  }
}
