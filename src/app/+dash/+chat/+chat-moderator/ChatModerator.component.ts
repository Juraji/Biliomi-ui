import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  COMPONENT_TEMPLATE,
  RedirectToFirstChildComponent
} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";

@Component({
  selector: "chat-moderator",
  templateUrl: COMPONENT_TEMPLATE
})
export class ChatModeratorComponent extends RedirectToFirstChildComponent {

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
}
