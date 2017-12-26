import {Component, OnInit, Optional, TemplateRef} from "@angular/core";
import {RestTableDataSource} from "../classes/RestTableDataSource";
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
  private _parentTable: DataTableComponent<T>;
  private _dialog: MatDialog;

  public get parentTableId(): string {
    return this._parentTable.tableId;
  }

  public get tableExportConfig(): IXlsxExportConfig {
    return this._parentTable.exportConfig;
  }

  public get customActionsDef(): TemplateRef<any> {
    return this._parentTable.customTableActions;
  }

  public get dataSource(): RestTableDataSource<T> {
    return this._parentTable.dataSource;
  }

  constructor(@Optional() table: DataTableComponent<T>, dialog: MatDialog) {
    this._parentTable = table || {} as DataTableComponent<T>;
    this._dialog = dialog;
  }

  public ngOnInit() {
  }

  public exportData() {
    let config: IXlsxExportConfig = this.tableExportConfig;
    if (config) {
      let exporter = new XlsxExporter(config);
      exporter.exportData(this.dataSource.currentData);
    }
  }

  public tableSetup() {
    this._dialog.open(TableSetupModalComponent, {data: this._parentTable.columnSetup})
      .afterClosed()
      .subscribe((newColumnSetup: TableColumnsSetup) => {
        if (newColumnSetup) {
          Storage.store(this.parentTableId, newColumnSetup);
          this._parentTable.columnSetup = newColumnSetup;
        }
      });
  }
}
