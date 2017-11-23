import {Component, ElementRef, ViewChild} from "@angular/core";
import {BiliomiApiService} from "../../shared/modules/biliomi/services/BiliomiApi.service";
import {BiliomiEventsService} from "../../shared/modules/biliomi/services/BiliomiEvents.service";
import {MatSnackBar} from "@angular/material";
import {BILIOMI_CLI_COMMANDS} from "../../shared/modules/biliomi/classes/constants/BiliomiApiVariables";

@Component({
  selector: "nav-remote-management-component",
  templateUrl: require("./NavRemoteManagement.template.pug"),
  styleUrls: [require("./NavRemoteManagement.less").toString()]
})
export class NavRemoteManagementComponent {
  private _api: BiliomiApiService;
  private _matSnackBar: MatSnackBar;
  private _parentElement: ElementRef;
  private eventsService: BiliomiEventsService;
  private managementCardVisible: boolean = false;

  @ViewChild("managementCard", {read: ElementRef})
  private set _managementCardElement(content: ElementRef) {
    // Correct card position when shown, to account for randomness in preceding component sizes
    if (content != null) {
      let elLeft = this._parentElement.nativeElement.offsetLeft - content.nativeElement.offsetWidth + this._parentElement.nativeElement.offsetWidth;
      content.nativeElement.style = "left: " + elLeft + "px";
    }
  }

  constructor(api: BiliomiApiService, eventsService: BiliomiEventsService, matSnackBar: MatSnackBar, parentElement: ElementRef) {
    this._api = api;
    this._matSnackBar = matSnackBar;
    this._parentElement = parentElement;
    this.eventsService = eventsService;
  }

  private toggleManagementCard() {
    this.managementCardVisible = !this.managementCardVisible;
  }

  private powerRestartBiliomi() {
    this._api.postCliCommand(BILIOMI_CLI_COMMANDS.RESTART);
  }

  private powerShutDownBiliomi() {
    this._api.postCliCommand(BILIOMI_CLI_COMMANDS.EXIT);
  }
}
