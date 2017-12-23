import {
  AfterViewInit, Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef,
  ViewChild
} from "@angular/core";
import {MatDialog, MatPaginator} from "@angular/material";
import {CdkColumnDef} from "@angular/cdk/table";
import {ExtCdkTableComponent} from "./components/ExtCdkTable.component";
import {IXlsxExportConfig} from "../xlsx-export/classes/interfaces/Xlsx.interface";
import {XlsxExporter} from "../xlsx-export/classes/XlsxExporter";
import {TableSetupModalComponent} from "./components/TableSetupModal.component";
import {Storage} from "../../classes/Storage";
import {ColumnSetup, TableColumnsSetup} from "./classes/interfaces/TableColumnSetup.interface";
import {TableButtonsDirective} from "./directives/TableButtons.directive";
import {RestTableDataSource} from "./classes/RestTableDataSource";

const TABLE_INDEX_PREFIX: string = "tableColumns";

@Component({
  selector: "data-table",
  templateUrl: require("./DataTable.template.pug"),
  styleUrls: [require("./DataTable.less").toString()],
})
export class DataTableComponent<T> implements AfterViewInit {
  private _dialog: MatDialog;
  private _columnSetup: TableColumnsSetup = [];
  private _tableIndex: string;

  @Input("tableId")
  public set tableId(tableId: string) {
    this._tableIndex = `${TABLE_INDEX_PREFIX}[${tableId}]`
  }

  @Input("tableDataSource")
  public tableDataSource: RestTableDataSource<T>;

  @Input("exportConfig")
  public exportConfig: IXlsxExportConfig = null;

  @ViewChild("paginator", {read: MatPaginator})
  public paginator: MatPaginator;

  @ViewChild("table", {read: ExtCdkTableComponent})
  public table: ExtCdkTableComponent<T>;

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
    this.tableDataSource.paginator = this.paginator;
    this.columnDefs.forEach((def: CdkColumnDef) => this.table.addColumnDef(def));

    let columnIds = this.table.columnIds;
    if (this.tableId != null) {
      columnIds = Storage.get(this._tableIndex, columnIds);
    }

    this._columnSetup = this.columnDefs.map((def: CdkColumnDef) => {
      return {
        id: def.name,
        visible: (columnIds.indexOf(def.name) > -1)
      };
    });

    this.table.viewChange.subscribe(()=> this.tableDataSource.update());
  }

  public exportData() {
    let exporter = new XlsxExporter(this.exportConfig);
    exporter.exportData(this.tableDataSource.data);
  }

  public tableSetup() {
    this._dialog.open(TableSetupModalComponent, {data: this._columnSetup})
      .afterClosed()
      .subscribe(() => Storage.store(this._tableIndex, this.displayedColumnIds));
  }
}
