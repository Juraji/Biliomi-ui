import {Component} from "@angular/core";
import {
  COMPONENT_TEMPLATE,
  RedirectToFirstChildComponent
} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "chat-moderator",
  templateUrl: COMPONENT_TEMPLATE
})
export class ChatModeratorComponent extends RedirectToFirstChildComponent {

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super("/dash/chat/chat-moderator", router, activatedRoute);
  }
}
