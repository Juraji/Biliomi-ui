import {Component, Optional} from "@angular/core";
import {ProgressBarMode} from "../../ng-material/classes/interfaces/ProgressBarMode.enum";
import {DataTableComponent} from "../DataTable.component";
import {RestTableDataSource} from "../classes/RestTableDataSource";

@Component({
  selector: "data-source-progress-bar",
  templateUrl: require("./DataSourceProgressBar.template.html")
})
export class DataSourceProgressBarComponent<T> {
  private _parentTable: DataTableComponent<T>;

  public get dataSource(): RestTableDataSource<T> {
    return this._parentTable.dataSource;
  }

  constructor(@Optional() table: DataTableComponent<T>) {
    this._parentTable = table || {} as DataTableComponent<T>;
  }

  public get showProgressbar(): boolean {
    return this.dataSource && this.dataSource.progressBarMode !== ProgressBarMode.NONE;
  }
}
