import {Component} from "@angular/core";
import {RedirectToFirstChildComponent} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "chat-moderator",
  templateUrl: require("../../../shared/classes/abstract/RedirectToFirstChildComponentTemplate.pug")
})
export class ChatModeratorComponent extends RedirectToFirstChildComponent{

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super("/dash/chat/chat-moderator", router, activatedRoute);
  }
}
