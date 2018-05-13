import { Component } from "@angular/core";
import { BiliomiEventsService } from "../../shared/modules/biliomi/services/BiliomiEvents.service";
import { PowerManagementDialogComponent } from "./PowerManagementDialog.component";
import { DialogsService } from "../../shared/modules/dialogs/services/Dialogs.service";

import "./NavRemoteManagement.less";

@Component({
    selector: "nav-remote-management-component",
    templateUrl: require("./NavRemoteManagement.template.html")
})
export class NavRemoteManagementComponent {
    public eventsService: BiliomiEventsService;
    private _dialog: DialogsService;

    constructor(eventsService: BiliomiEventsService, dialog: DialogsService) {
        this.eventsService = eventsService;
        this._dialog = dialog;
    }

    public handleItemClick() {
        if (this.eventsService.isConnected) {
            this._dialog.open(PowerManagementDialogComponent);
        } else if (!this.eventsService.isConnecting) {
            this.eventsService.connect();
        }
    }
}
