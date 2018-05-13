import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    REDIRECT_COMPONENT_TEMPLATE,
    RedirectToFirstChildComponent
} from "../../shared/classes/abstract/RedirectToFirstChildComponent";

import "./Commands.less";

@Component({
    selector: "commands-page",
    templateUrl: REDIRECT_COMPONENT_TEMPLATE
})
export class CommandsComponent extends RedirectToFirstChildComponent {

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }
}
