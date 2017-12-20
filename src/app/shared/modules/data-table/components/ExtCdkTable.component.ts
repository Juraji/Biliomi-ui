import {
  AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren,
  EmbeddedViewRef, Input, IterableChangeRecord, IterableDiffer, IterableDiffers, NgIterable, OnDestroy, OnInit, QueryList,
  TrackByFunction, ViewChild, ViewEncapsulation,
} from '@angular/core';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {
  CdkCellDef, CdkCellOutlet, CdkCellOutletRowContext, CdkColumnDef, CdkHeaderRowDef,
  CdkRowDef
} from "@angular/cdk/table";
import {ExtCdkTablePlaceHolderDirective} from "./ExtCdkTablePlaceHolder.directive";
import {TableDataSource} from "../classes/TableDataSource";

abstract class RowViewRef<T> extends EmbeddedViewRef<CdkCellOutletRowContext<T>> {
}

@Component({
  selector: "ext-cdk-table",
  templateUrl: require("./ExtCdkTable.template.pug"),
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {"class": "mat-table", "role": "grid"},
})
export class ExtCdkTableComponent<T> implements OnInit, OnDestroy, AfterContentChecked {
  private _onDestroy = new Subject<void>();
  private _data: NgIterable<T> = [];
  private _renderChangeSubscription: Subscription | null;
  private _columnDefsByName = new Map<string, CdkColumnDef>();
  private _rowDefs: CdkRowDef<T>[];
  private _dataDiffer: IterableDiffer<T>;
  private _defaultRowDef: CdkRowDef<T> | null;
  private _customColumnDefs = new Set<CdkColumnDef>();
  private _dataSource: TableDataSource<T>;
  private _headerRowDefChanged = false;
  private _differs: IterableDiffers;
  private _changeDetectorRef: ChangeDetectorRef;

  public viewChange = new BehaviorSubject<{ start: number, end: number }>({start: 0, end: Number.MAX_VALUE});

  @Input("trackBy")
  public trackBy: TrackByFunction<T>;

  @Input()
  public get dataSource(): TableDataSource<T> {
    return this._dataSource;
  }

  public set dataSource(dataSource: TableDataSource<T>) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }

  @ViewChild("contentRows", {read: ExtCdkTablePlaceHolderDirective})
  public _rowPlaceholder: ExtCdkTablePlaceHolderDirective;

  @ViewChild("headerRow", {read: ExtCdkTablePlaceHolderDirective})
  public _headerRowPlaceholder: ExtCdkTablePlaceHolderDirective;

  @ContentChildren(CdkRowDef)
  public _contentRowDefs: QueryList<CdkRowDef<T>>;

  @ContentChild(CdkHeaderRowDef)
  public _headerRowDef: CdkHeaderRowDef;

  constructor(differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef) {
    this._differs = differs;
    this._changeDetectorRef = changeDetectorRef;
  }

  public ngOnInit() {
    this._dataDiffer = this._differs.find([]).create(this.trackBy);

    if (this._headerRowDef) {
      this._headerRowDefChanged = true;
    }
  }

  public ngOnDestroy() {
    this._rowPlaceholder.viewContainer.clear();
    this._headerRowPlaceholder.viewContainer.clear();
    this._onDestroy.next();
    this._onDestroy.complete();

    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  public ngAfterContentChecked() {
    this._cacheRowDefs();
    this._cacheColumnDefs();

    if (!this._headerRowDef && !this._rowDefs.length) {
      throw new Error("Missing definitions for header and row, cannot determine which columns should be rendered.");
    }

    this._renderUpdatedColumns();

    if (this._headerRowDefChanged) {
      this._renderHeaderRow();
      this._headerRowDefChanged = false;
    }

    if (this.dataSource && this._rowDefs.length > 0 && !this._renderChangeSubscription) {
      this._observeRenderChanges();
    }
  }

  public get columnIds(): string[] {
    return Array.from(this._columnDefsByName.keys());
  }

  public addColumnDef(columnDef: CdkColumnDef) {
    this._customColumnDefs.add(columnDef);
    this._cacheColumnDefs();
  }

  private _cacheColumnDefs() {
    this._columnDefsByName.clear();

    const columnDefs = Array.from(this._customColumnDefs);

    columnDefs.forEach(columnDef => {
      if (this._columnDefsByName.has(columnDef.name)) {
        throw new Error(`Duplicate column definition name provided: "${columnDef.name}".`);
      }
      this._columnDefsByName.set(columnDef.name, columnDef);
    });
  }

  private _cacheRowDefs() {
    this._rowDefs = this._contentRowDefs ? this._contentRowDefs.toArray() : [];

    const defaultRowDefs = this._rowDefs.filter(def => !def.when);

    if (defaultRowDefs.length > 1) {
      throw new Error(`There can only be one default row without a when predicate function.`);
    }
    this._defaultRowDef = defaultRowDefs[0];
  }

  private _renderUpdatedColumns() {
    this._rowDefs.forEach(def => {
      if (!!def.getColumnsDiff()) {
        this._dataDiffer.diff([]);

        this._rowPlaceholder.viewContainer.clear();
        this._renderRowChanges();
      }
    });

    if (this._headerRowDef && this._headerRowDef.getColumnsDiff()) {
      this._renderHeaderRow();
    }
  }

  private _switchDataSource(dataSource: TableDataSource<T>) {
    this._data = [];

    if (this.dataSource) {
      this.dataSource.disconnect();
    }

    if (this._renderChangeSubscription) {
      this._renderChangeSubscription.unsubscribe();
      this._renderChangeSubscription = null;
    }

    if (!dataSource) {
      this._rowPlaceholder.viewContainer.clear();
    }

    this._dataSource = dataSource;
  }

  private _observeRenderChanges() {
    this._renderChangeSubscription = this.dataSource.connect().pipe(takeUntil(this._onDestroy))
      .subscribe(data => {
        this._data = data;
        this._renderRowChanges();
      });
  }

  private _renderHeaderRow() {
    if (this._headerRowPlaceholder.viewContainer.length > 0) {
      this._headerRowPlaceholder.viewContainer.clear();
    }

    const cells = this._getHeaderCellTemplatesForRow(this._headerRowDef);
    if (!cells.length) {
      return;
    }

    this._headerRowPlaceholder.viewContainer
      .createEmbeddedView(this._headerRowDef.template, {cells});

    cells.forEach((cell: CdkCellDef) => {
      if (CdkCellOutlet.mostRecentCellOutlet) {
        CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cell.template, {});
      }
    });

    this._changeDetectorRef.markForCheck();
  }

  private _renderRowChanges() {
    const changes = this._dataDiffer.diff(this._data);
    if (!changes) {
      return;
    }

    const viewContainer = this._rowPlaceholder.viewContainer;
    changes.forEachOperation(
      (record: IterableChangeRecord<T>, adjustedPreviousIndex: number, currentIndex: number) => {
        if (record.previousIndex == null) {
          this._insertRow(record.item, currentIndex);
        } else if (currentIndex == null) {
          viewContainer.remove(adjustedPreviousIndex);
        } else {
          const view = <RowViewRef<T>>viewContainer.get(adjustedPreviousIndex);
          viewContainer.move(view!, currentIndex);
        }
      });

    this._updateRowIndexContext();

    changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
      const rowView = <RowViewRef<T>>viewContainer.get(record.currentIndex!);
      rowView.context.$implicit = record.item;
    });
  }

  private _getRowDef(data: T, i: number): CdkRowDef<T> {
    if (this._rowDefs.length == 1) {
      return this._rowDefs[0];
    }

    let rowDef = this._rowDefs.find(def => def.when && def.when(i, data)) || this._defaultRowDef;
    if (!rowDef) {
      throw new Error(`Could not find a matching row definition for the provided row data.`);
    }

    return rowDef;
  }

  private _insertRow(rowData: T, index: number) {
    const row = this._getRowDef(rowData, index);

    const context: CdkCellOutletRowContext<T> = {$implicit: rowData};

    this._rowPlaceholder.viewContainer.createEmbeddedView(row.template, context, index);

    this._getCellTemplatesForRow(row).forEach(cell => {
      if (CdkCellOutlet.mostRecentCellOutlet) {
        CdkCellOutlet.mostRecentCellOutlet._viewContainer
          .createEmbeddedView(cell.template, context);
      }
    });

    this._changeDetectorRef.markForCheck();
  }

  private _updateRowIndexContext() {
    const viewContainer = this._rowPlaceholder.viewContainer;
    for (let index = 0, count = viewContainer.length; index < count; index++) {
      const viewRef = viewContainer.get(index) as RowViewRef<T>;
      viewRef.context.index = index;
      viewRef.context.count = count;
      viewRef.context.first = index === 0;
      viewRef.context.last = index === count - 1;
      viewRef.context.even = index % 2 === 0;
      viewRef.context.odd = !viewRef.context.even;
    }
  }

  private _getHeaderCellTemplatesForRow(headerDef: CdkHeaderRowDef) {
    if (!headerDef || !headerDef.columns) {
      return [];
    }
    return headerDef.columns.map((columnId: string) => {
      const column = this._columnDefsByName.get(columnId);

      if (!column) {
        throw new Error(`Could not find column with id "${columnId}".`);
      }

      return column.headerCell;
    });
  }

  private _getCellTemplatesForRow(rowDef: CdkRowDef<T>): CdkCellDef[] {
    if (!rowDef.columns) {
      return [];
    }

    return rowDef.columns.map((columnId: string) => {
      const column = this._columnDefsByName.get(columnId);

      if (!column) {
        throw new Error(`Could not find column with id "${columnId}".`);
      }

      return column.cell;
    });
  }
}
