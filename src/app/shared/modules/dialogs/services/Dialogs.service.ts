import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "../declarations/ConfirmDialog.component";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DialogsService extends MatDialog {

  public confirm(message: string | string[], dialogId?: string, confirmButtonText?: string, cancelButtonText?: string): Promise<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent> = this.open(ConfirmDialogComponent, {
      id: dialogId,
      data: {
        message: (Array.isArray(message) ? message : [message]),
        confirmButtonText: confirmButtonText || "Confirm",
        cancelButtonText: cancelButtonText || "Cancel"
      } as IConfirmDialogData
    });

    return dialogRef
      .afterClosed()
      .toPromise();
  }
}
