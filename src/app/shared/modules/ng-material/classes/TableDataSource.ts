import {MatTableDataSource} from "@angular/material";
import {Supplier} from "../../tools/FunctionalInterface";
import {ProgressBarMode} from "../components/DataSourceProgressBar.component";

export class TableDataSource<T> extends MatTableDataSource<T> {
  private dataSupplier: Supplier<Promise<T[]>>;
  private _progressBarMode: ProgressBarMode = ProgressBarMode.NONE;

  constructor(dataSupplier: Supplier<Promise<T[]>>) {
    super([]);
    this.dataSupplier = dataSupplier;
  }

  public get hasData(): boolean {
    return this.data != null && this.data.length > 0;
  }

  public async update(): Promise<void> {
    this._progressBarMode = ProgressBarMode.INDETERMINATE;
    this.data = await this.dataSupplier() || [];
    this._progressBarMode = ProgressBarMode.NONE;
  }

  // noinspection JSMethodCanBeStatic
  public get progressBarMode(): ProgressBarMode {
    return this._progressBarMode;
  }
}
