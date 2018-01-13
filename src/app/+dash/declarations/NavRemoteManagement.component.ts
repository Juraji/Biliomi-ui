import {Component} from "@angular/core";
import {BiliomiEventsService} from "../../shared/modules/biliomi/services/BiliomiEvents.service";
import {PowerManagementDialogComponent} from "./PowerManagementDialog.component";
import {DialogsService} from "../../shared/modules/dialogs/services/Dialogs.service";

@Component({
  selector: "nav-remote-management-component",
  templateUrl: require("./NavRemoteManagement.template.pug"),
  styleUrls: [require("./NavRemoteManagement.less").toString()]
})
export class NavRemoteManagementComponent {
  private _dialog: DialogsService;
  public eventsService: BiliomiEventsService;

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
