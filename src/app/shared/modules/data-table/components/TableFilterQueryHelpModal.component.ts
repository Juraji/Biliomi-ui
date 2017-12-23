import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: "table-filter-query-help-modal",
  templateUrl: require("./TableFilterQueryHelpModal.template.pug"),
  styleUrls: [require("./TableFilterQueryHelpModal.less").toString()]
})
export class TableFilterQueryHelpModalComponent implements OnInit {
  private _dialogRef: MatDialogRef<TableFilterQueryHelpModalComponent>;

  constructor(dialogRef: MatDialogRef<TableFilterQueryHelpModalComponent>) {
    this._dialogRef = dialogRef;
  }

  public ngOnInit() {
    this._dialogRef.updateSize("100vw");
  }

  public close() {
    this._dialogRef.close();
  }
}
