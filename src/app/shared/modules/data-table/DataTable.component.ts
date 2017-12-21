import {AfterViewInit, Component, ContentChildren, Input, QueryList, ViewChild} from "@angular/core";
import {TableDataSource} from "./classes/TableDataSource";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {CdkColumnDef} from "@angular/cdk/table";
import {ExtCdkTableComponent} from "./components/ExtCdkTable.component";
import {IXlsxExportConfig} from "../xlsx-export/classes/interfaces/Xlsx.interface";
import {XlsxExporter} from "../xlsx-export/classes/XlsxExporter";
import {TableSetupModalComponent} from "./components/TableSetupModal.component";
import {Storage} from "../../classes/Storage";
import {ColumnSetup, TableColumnsSetup} from "./classes/interfaces/TableColumnSetup.interface";

const DISPLAYED_COLUMNS_STORAGE_KEY_PREFIX: string = "tableColumns.";

@Component({
  selector: "data-table",
  templateUrl: require("./DataTable.template.pug"),
  styleUrls: [require("./DataTable.less").toString()],
})
export class DataTableComponent<T> implements AfterViewInit {
  private _dialog: MatDialog;
  private _columnSetup: TableColumnsSetup = [];

  @Input("tableDataSource")
  public tableDataSource: TableDataSource<T>;

  @Input("tableId")
  public tableId: string;

  @ViewChild("paginator", {read: MatPaginator})
  public paginator: MatPaginator;

  @Input("exportConfig")
  public exportConfig: IXlsxExportConfig = null;

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild("table", {read: ExtCdkTableComponent})
  public table: ExtCdkTableComponent<T>;

  @ContentChildren(CdkColumnDef)
  public columnDefs: QueryList<CdkColumnDef>;

  public get displayedColumnIds(): string[] {
    return this._columnSetup
      .filter((cs: ColumnSetup) => cs.visible)
      .map((cs: ColumnSetup) => cs.id);
  }

  constructor(dialog: MatDialog) {
    this._dialog = dialog;
  }

  public ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
    this.columnDefs.forEach((def: CdkColumnDef) => this.table.addColumnDef(def));

    let storageDisplayedIds: string[] = Storage.get(DISPLAYED_COLUMNS_STORAGE_KEY_PREFIX + this.tableId, this.table.columnIds);
    this._columnSetup = this.columnDefs.map((def: CdkColumnDef) => {
      return {
        id: def.name,
        headerCellDef: def.headerCell,
        visible: (storageDisplayedIds.indexOf(def.name) > -1)
      };
    });
  }

  public exportData() {
    let exporter = new XlsxExporter(this.exportConfig);
    exporter.exportData(this.tableDataSource.data);
  }

  public tableSetup() {
    this._dialog.open(TableSetupModalComponent, {data: this._columnSetup})
      .afterClosed()
      .subscribe(() => Storage.store(DISPLAYED_COLUMNS_STORAGE_KEY_PREFIX + this.tableId, this.displayedColumnIds));
  }
}
