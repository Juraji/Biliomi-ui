import {AfterViewInit, Component, Input, OnDestroy, ViewChild} from "@angular/core";
import {MatPaginator, PageEvent} from "@angular/material";
import {RestTableDataSource} from "../classes/RestTableDataSource";
import {Subscription} from "rxjs/Subscription";

const DEFAULT_LIMIT: number = 20;

@Component({
  selector: "data-source-paginator",
  templateUrl: require("./DataSourcePaginator.template.pug"),
  styleUrls: [require("./DataSourcePaginator.less").toString()]
})
export class DataSourcePaginatorComponent<T> implements AfterViewInit, OnDestroy {
  private _dataSource: RestTableDataSource<T>;
  private _dsUpdateSub: Subscription;
  private _pgnPageSub: Subscription;

  @Input("lockPaging")
  public lockPaging: boolean;

  @ViewChild("matPaginator", {read: MatPaginator})
  public paginator: MatPaginator;

  public get pagingOptions(): number[] {
    return (this.lockPaging ? [] : [10, 20, 50, 100, 200]);
  }

  public set dataSource(dataSource: RestTableDataSource<T>) {
    if (this._dsUpdateSub) {
      this._dsUpdateSub.unsubscribe();
    }

    this._dataSource = dataSource;
    this._dsUpdateSub = this._dataSource.dataSubject
      .subscribe(() => {
        this._updatePaginator(this._dataSource.totalRowsAvailable)
      });
  }

  public ngAfterViewInit() {
    this._updateDataSourceParams(DEFAULT_LIMIT, 0, false);

    if (!this.lockPaging) {
      this._pgnPageSub = this.paginator.page.subscribe((e: PageEvent) => {
        this._updateDataSourceParams(e.pageSize, e.pageIndex);
      });
    }
  }

  public ngOnDestroy() {
    if (this._dsUpdateSub) {
      this._dsUpdateSub.unsubscribe();
    }
    if (this._pgnPageSub) {
      this._pgnPageSub.unsubscribe();
    }
  }

  public showEveryThing() {
    if (!this.lockPaging && this.paginator && this._dataSource && this.paginator.pageSize < this._dataSource.totalRowsAvailable) {
      this.paginator.pageSize = this._dataSource.totalRowsAvailable;
      this._updateDataSourceParams(this.paginator.pageSize, 0);
    }
  }

  private _updatePaginator(dataCount: number) {
    this.paginator.length = dataCount;
    if (this.paginator.pageIndex > 0) {
      const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
      this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
    }
  }

  private _updateDataSourceParams(limit: number, pageIndex: number, doUpdate: boolean = true) {
    if (this._dataSource) {
      this._dataSource.clientParams
        .set("limit", limit)
        .set("offset", Math.max((pageIndex * limit), 0));

      if (doUpdate) {
        this._dataSource.update();
      }
    }
  }
}
