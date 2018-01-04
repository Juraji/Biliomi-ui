import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {BiliomiApiService} from "../../shared/modules/biliomi/services/BiliomiApi.service";
import {BILIOMI_CLI_COMMANDS} from "../../shared/modules/biliomi/classes/constants/BiliomiApiVariables";
import {ConfirmDialogService} from "../../shared/modules/confirm-dialog/services/ConfirmDialog.service";

@Component({
  selector: "power-management-dialog-component",
  templateUrl: require("./PowerManagementDialog.template.pug")
})
export class PowerManagementDialogComponent {
  private _api: BiliomiApiService;
  private _dialog: ConfirmDialogService;
  private _dialogRef: MatDialogRef<PowerManagementDialogComponent>;

  constructor(api: BiliomiApiService, dialog: ConfirmDialogService, dialogRef: MatDialogRef<PowerManagementDialogComponent>) {
    this._api = api;
    this._dialog = dialog;
    this._dialogRef = dialogRef;
  }

  public restartBiliomi() {
    this._dialog.confirm("Are you sure you want to restart Biliomi?")
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._api.postCliCommand(BILIOMI_CLI_COMMANDS.RESTART);
        }
        this._dialogRef.close();
      });
  }

  public shutdownBiliomi() {
    this._dialog.confirm("Are you sure you want to shut down Biliomi?")
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._api.postCliCommand(BILIOMI_CLI_COMMANDS.EXIT);
        }
        this._dialogRef.close();
      });
  }

  public close() {
    this._dialogRef.close();
  }
}
