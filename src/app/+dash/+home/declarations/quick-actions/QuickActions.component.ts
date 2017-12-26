import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {BiliomiApiService} from "../../../../shared/modules/biliomi/services/BiliomiApi.service";
import {Storage} from "../../../../shared/storage/Storage";
import {QUICK_ACTIONS_STORAGE_KEY, QuickAction, QuickActionType} from "./declarations/QuickAction.interface";
import {MatDialog, MatDialogRef} from "@angular/material";
import {AddQuickActionModalComponent} from "./declarations/AddQuickActionModal.component";

@Component({
  selector: "quick-actions",
  templateUrl: require("./QuickActions.template.pug"),
  styleUrls: [require("./QuickActions.less").toString()]
})
export class QuickActionsComponent {
  private _api: BiliomiApiService;
  private _router: Router;
  private _dialog: MatDialog;
  public quickActions: QuickAction[] = [];

  constructor(api: BiliomiApiService, router: Router, dialog: MatDialog) {
    this._api = api;
    this._router = router;
    this._dialog = dialog;
    this.loadQuickActions();
  }

  public executeAction(action: QuickAction) {
    switch (action.type) {
      case QuickActionType.COMMAND:
        let parts: string[] = action.execute.split(" ");
        let command: string = parts.shift();
        this._api.postCommand(command, ...parts);
        break;
      case QuickActionType.PAGE:
        this._router.navigateByUrl(action.execute);
        break;
      case QuickActionType.URL:
        window.open(action.execute, "_blank");
        break;
    }
  }

  public addQuickAction() {
    let dialogRef: MatDialogRef<AddQuickActionModalComponent> = this._dialog.open(AddQuickActionModalComponent, {
      width: "600px"
    });

    dialogRef.afterClosed().subscribe((action: QuickAction) => {
      if (action != null) {
        this.quickActions.push(action);
        this.loadQuickActions(true);
      }
    });
  }

  public deleteQuickAction(action: QuickAction) {
    let index: number = this.quickActions.findIndex((a: QuickAction) => a.name == action.name);
    this.quickActions.splice(index, 1);
    this.loadQuickActions(true);
  }

  private loadQuickActions(saveFirst?: boolean) {
    if (saveFirst) {
      Storage.store(QUICK_ACTIONS_STORAGE_KEY, this.quickActions);
    }
    this.quickActions = Storage.get(QUICK_ACTIONS_STORAGE_KEY, []);
  }
}
