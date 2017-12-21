import {
  AfterViewInit, Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef, ViewChild,
  ViewContainerRef
} from "@angular/core";
import {TableDataSource} from "./classes/TableDataSource";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {CdkColumnDef} from "@angular/cdk/table";
import {ExtCdkTableComponent} from "./components/ExtCdkTable.component";
import {IXlsxExportConfig} from "../xlsx-export/classes/interfaces/Xlsx.interface";
import {XlsxExporter} from "../xlsx-export/classes/XlsxExporter";
import {TableSetupModalComponent} from "./components/TableSetupModal.component";
import {Storage} from "../../classes/Storage";
import {ColumnSetup, TableColumnsSetup} from "./classes/interfaces/TableColumnSetup.interface";
import {TableButtonsDirective} from "./components/TableButtons.directive";

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

  @Input("exportConfig")
  public exportConfig: IXlsxExportConfig = null;

  @ViewChild("paginator", {read: MatPaginator})
  public paginator: MatPaginator;

  @ViewChild("table", {read: ExtCdkTableComponent})
  public table: ExtCdkTableComponent<T>;

  @ViewChild("tableButtonsPlaceHolder", {read: ViewContainerRef})
  public tableButtonsPlaceHolder: ViewContainerRef;

  @ContentChild(TableButtonsDirective, {read: TemplateRef})
  public tableButtonsRef: TemplateRef<any>;

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
    if (this.tableButtonsRef != null) {
      this.tableButtonsPlaceHolder.createEmbeddedView(this.tableButtonsRef);
    }

    this.tableDataSource.paginator = this.paginator;
    this.columnDefs.forEach((def: CdkColumnDef) => this.table.addColumnDef(def));

    let columnIds = this.table.columnIds;
    if (this.tableId!=null) {
      columnIds = Storage.get(DISPLAYED_COLUMNS_STORAGE_KEY_PREFIX + this.tableId, columnIds);
    }

    this._columnSetup = this.columnDefs.map((def: CdkColumnDef) => {
      return {
        id: def.name,
        headerCellDef: def.headerCell,
        visible: (columnIds.indexOf(def.name) > -1)
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
