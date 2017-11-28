import {Component} from "@angular/core";
import {BiliomiEventsService} from "../../shared/modules/biliomi/services/BiliomiEvents.service";
import {MatDialog} from "@angular/material";
import {PowerManagementDialogComponent} from "./PowerManagementDialog.component";

@Component({
  selector: "nav-remote-management-component",
  templateUrl: require("./NavRemoteManagement.template.pug"),
  styleUrls: [require("./NavRemoteManagement.less").toString()]
})
export class NavRemoteManagementComponent {
  private eventsService: BiliomiEventsService;
  private _dialog: MatDialog;

  constructor(eventsService: BiliomiEventsService, dialog: MatDialog) {
    this.eventsService = eventsService;
    this._dialog = dialog;
  }

  private openMgmtDialog() {
    if (this.eventsService.isConnected) {
      this._dialog.open(PowerManagementDialogComponent);
    }
  }
}
