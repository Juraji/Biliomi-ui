import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  ViewEncapsulation
} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {RestTableDataSource} from "../classes/RestTableDataSource";
import {Supplier} from "../../tools/FunctionalInterface";

import "./DataSourcePaginator.less";

const DEFAULT_PAGE_SIZE: number = 10;
const DEFAULT_PAGE_SIZE_OPTIONS: Supplier<number[]> = () => [10, 20, 50, 100, 200];

@Component({
  selector: "data-source-paginator",
  templateUrl: require("./DataSourcePaginator.template.pug"),
  host: {"class": "data-source-paginator"},
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class DataSourcePaginatorComponent<T> implements OnInit, OnDestroy {
  private _dataSource: RestTableDataSource<T>;
  private _dsUpdateSub: Subscription;
  private _initialized: boolean;
  private _pageIndex: number = 0;
  private _length: number = 0;
  private _pageSize: number;
  private _displayedPageSizeOptions: number[] = [];
  private _changeDetectorRef: ChangeDetectorRef;

  @Input("lockPaging")
  public lockPaging: boolean;

  public get pageIndex(): number {
    return this._pageIndex;
  }

  public get hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this._pageSize !== 0;
  }

  public get hasNextPage(): boolean {
    const numberOfPages = Math.ceil(this._length / this._pageSize) - 1;
    return this.pageIndex < numberOfPages && this._pageSize !== 0;
  }

  public get rangeLabel(): string {
    if (this._length === 0 || this._pageSize === 0) {
      return `0 of ${length}`;
    }

    const startIndex: number = this._pageIndex * this._pageSize;
    const endIndex: number = Math.min(startIndex + this._pageSize, this._length);
    return `${startIndex + 1} - ${endIndex} of ${this._length}`;
  }

  public set dataSource(dataSource: RestTableDataSource<T>) {
    this.ngOnDestroy();

    this._dataSource = dataSource;
    this._dsUpdateSub = this._dataSource.dataSubject
      .subscribe(() => this._updatePaginator(this._dataSource.totalRowsAvailable));
  }

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this._changeDetectorRef = changeDetectorRef;
  }

  public ngOnInit() {
    this._initialized = true;
    this._updateDataSource(DEFAULT_PAGE_SIZE, 0, false);
  }

  public ngOnDestroy() {
    if (this._dsUpdateSub) {
      this._dsUpdateSub.unsubscribe();
      this._dsUpdateSub = null;
    }
  }

  public nextPage() {
    if (this.hasNextPage) {
      this._pageIndex++;
      this._updateDataSource(this._pageSize, this._pageIndex);
    }
  }

  public previousPage() {
    if (this.hasPreviousPage) {
      this._pageIndex--;
      this._updateDataSource(this._pageSize, this._pageIndex);
    }
  }

  public changePageSize(pageSize: number) {
    const startIndex = this._pageIndex * this._pageSize;
    this._pageIndex = Math.floor(startIndex / pageSize) || 0;

    this._pageSize = pageSize;
    this._updateDataSource(this._pageSize, this._pageIndex);
  }

  private _updateDisplayedPageSizeOptions() {
    if (this._initialized) {
      if (this._pageSize == null) {
        this._pageSize = DEFAULT_PAGE_SIZE;
      }

      this._displayedPageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS();
      if (this._displayedPageSizeOptions.indexOf(this._pageSize) === -1) {
        this._displayedPageSizeOptions.push(this._pageSize);
      }

      this._displayedPageSizeOptions.sort((a, b) => a - b);

      if (this._length > this._displayedPageSizeOptions.slice().pop()) {
        this._displayedPageSizeOptions.push(this._length);
      }

      this._changeDetectorRef.markForCheck();
    }
  }

  private _updatePaginator(totalRowsAvailable: number) {
    this._length = totalRowsAvailable;
    const lastPageIndex = Math.ceil(this._length / this._pageSize) - 1;
    if (!isNaN(lastPageIndex) && lastPageIndex > -1) {
      this._pageIndex = Math.min(this._pageIndex, lastPageIndex);
    }
    this._updateDisplayedPageSizeOptions();
  }

  private _updateDataSource(limit: number, pageIndex: number, doUpdate: boolean = true) {
    if (!this.lockPaging && this._dataSource) {
      this._dataSource.clientParams
        .set("limit", limit)
        .set("offset", Math.max((pageIndex * limit), 0));

      if (doUpdate) {
        this._dataSource.update();
      }
    }
  }
}
