import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TableColumnsSetup} from "../classes/interfaces/TableColumnSetup.interface";

@Component({
  selector: "table-setup-modal",
  templateUrl: require("./TableSetupModal.template.pug")
})
export class TableSetupModalComponent {
  private _columnsSetup: TableColumnsSetup;
  private _dialogRef: MatDialogRef<TableSetupModalComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) columnsSetup: TableColumnsSetup, dialogRef: MatDialogRef<TableSetupModalComponent>) {
    this._columnsSetup = columnsSetup;
    this._dialogRef = dialogRef;
  }

  public saveTableSetup() {
    this._dialogRef.close();
  }
}
