import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    REDIRECT_COMPONENT_TEMPLATE,
    RedirectToFirstChildComponent
} from "../../../shared/classes/abstract/RedirectToFirstChildComponent";

@Component({
    selector: "users-page",
    templateUrl: REDIRECT_COMPONENT_TEMPLATE
})
export class UsersComponent extends RedirectToFirstChildComponent {
    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }
}
