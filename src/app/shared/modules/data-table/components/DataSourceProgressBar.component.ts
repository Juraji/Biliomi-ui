import {Component, HostBinding, Input} from "@angular/core";
import {RestTableDataSource} from "../classes/RestTableDataSource";
import {ProgressBarMode} from "../classes/interfaces/ProgressBarMode.interface";

@Component({
  selector: "data-source-progress-bar",
  templateUrl: require("./DataSourceProgressBar.template.pug")
})
export class DataSourceProgressBarComponent {

  @Input("dataSource")
  public dataSource: RestTableDataSource<any>;

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
