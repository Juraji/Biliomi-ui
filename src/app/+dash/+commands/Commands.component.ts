import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  COMPONENT_TEMPLATE,
  RedirectToFirstChildComponent
} from "../../shared/classes/abstract/RedirectToFirstChildComponent";

@Component({
  selector: "commands-page",
  templateUrl: COMPONENT_TEMPLATE,
  styleUrls: [require("./Commands.less").toString()]
})
export class CommandsComponent extends RedirectToFirstChildComponent {

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
}
