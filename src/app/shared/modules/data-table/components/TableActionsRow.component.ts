import {Component, Input, OnInit, Optional} from "@angular/core";
import {RestTableDataSource} from "../classes/RestTableDataSource";
import {CustomTableActionsDirective} from "../directives/CustomTableActions.directive";
import {DataTableComponent} from "../DataTable.component";
import {XlsxExporter} from "../../xlsx-export/classes/XlsxExporter";
import {IXlsxExportConfig} from "../../xlsx-export/classes/interfaces/Xlsx.interface";
import {Storage} from "../../../classes/Storage";
import {MatDialog} from "@angular/material";
import {TableColumnsSetup} from "../classes/interfaces/TableColumnSetup.interface";
import {TableSetupModalComponent} from "./TableSetupModal.component";

@Component({
  selector: "table-actions-row",
  templateUrl: require("./TableActionsRow.template.pug"),
  styleUrls: [require("./TableActionsRow.less").toString()]
})
export class TableActionsRowComponent<T> implements OnInit {
  private _table: DataTableComponent<T>;
  private _dialog: MatDialog;

  @Input("tableDataSource")
  public tableDataSource: RestTableDataSource<T>;

  @Input("customActionsDef")
  public customActionsDef: CustomTableActionsDirective;

  public get parentTableId(): string {
    if (this._table) {
      return this._table.tableId;
    } else {
      return null;
    }
  }

  public get tableExportConfig(): IXlsxExportConfig {
    if (this._table) {
      return this._table.exportConfig;
    } else {
      return null;
    }
  }

  constructor(@Optional() table: DataTableComponent<T>, dialog: MatDialog) {
    this._table = table;
    this._dialog = dialog;
  }

  public ngOnInit() {
  }

  public exportData() {
    let config: IXlsxExportConfig = this.tableExportConfig;
    if (config) {
      let exporter = new XlsxExporter(config);
      exporter.exportData(this.tableDataSource.currentData);
    }
  }

  public tableSetup() {
    this._dialog.open(TableSetupModalComponent, {data: this._table.columnSetup})
      .afterClosed()
      .subscribe((newColumnSetup: TableColumnsSetup) => {
        Storage.store(this.parentTableId, newColumnSetup);
        this._table.columnSetup = newColumnSetup;
      });
  }
}
