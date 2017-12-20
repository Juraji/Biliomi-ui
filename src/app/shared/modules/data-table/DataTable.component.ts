import {AfterViewInit, Component, ContentChildren, Input, QueryList, ViewChild} from "@angular/core";
import {TableDataSource} from "./classes/TableDataSource";
import {MatPaginator, MatSort} from "@angular/material";
import {CdkColumnDef} from "@angular/cdk/table";
import {ExtCdkTableComponent} from "./components/ExtCdkTable.component";
import {IXlsxExportConfig} from "../xlsx-export/classes/interfaces/Xlsx.interface";
import {XlsxExporter} from "../xlsx-export/classes/XlsxExporter";

@Component({
  selector: "data-table",
  templateUrl: require("./DataTable.template.pug"),
  styleUrls: [require("./DataTable.less").toString()],
})
export class DataTableComponent<T> implements AfterViewInit {

  @Input("tableDataSource")
  public tableDataSource: TableDataSource<T>;

  @Input("exportConfig")
  public exportConfig: IXlsxExportConfig;

  @ViewChild("paginator", {read: MatPaginator})
  public paginator: MatPaginator;

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild("table", {read: ExtCdkTableComponent})
  public table: ExtCdkTableComponent<T>;

  @ContentChildren(CdkColumnDef)
  public columnDefs: QueryList<CdkColumnDef>;

  public ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
    this.columnDefs.forEach((def: CdkColumnDef) => this.table.addColumnDef(def));
  }

  public exportData() {
    let exporter = new XlsxExporter(this.exportConfig);
    exporter.exportData(this.tableDataSource.data);
  }
}
