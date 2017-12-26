import {Component, Input} from "@angular/core";
import {ProgressBarMode} from "../../ng-material/classes/interfaces/ProgressBarMode.interface";
import {RestTableDataSource} from "../classes/RestTableDataSource";

@Component({
  selector: "data-source-progress-bar",
  templateUrl: require("./DataSourceProgressBar.template.pug")
})
export class DataSourceProgressBarComponent<T> {

  @Input("tableDataSource")
  public tableDataSource: RestTableDataSource<T>;

  public get showProgressbar(): boolean {
    return this.tableDataSource != null && this.tableDataSource.progressBarMode !== ProgressBarMode.NONE;
  }
}
