import {Component, HostBinding, Input} from "@angular/core";
import {TableDataSource} from "../classes/TableDataSource";

export enum ProgressBarMode {
  NONE = "none",
  DETERMINATE = "determinate",
  INDETERMINATE = "indeterminate",
  BUFFER = "buffer",
  QUERY = "determinate"
}

@Component({
  selector: "data-source-progress-bar",
  templateUrl: require("./DataSourceProgressBar.template.pug")
})
export class DataSourceProgressBarComponent {

  @Input("dataSource")
  public dataSource: TableDataSource<any>;

  @HostBinding("hidden")
  public get hideProgressBar(): boolean {
    return this.progressBarMode == ProgressBarMode.NONE;
  }

  public get progressBarMode(): ProgressBarMode {
    if (this.dataSource == null) {
      return ProgressBarMode.NONE;
    }

    return this.dataSource.progressBarMode;
  }
}
