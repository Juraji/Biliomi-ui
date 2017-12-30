import {
  AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild,
  ContentChildren, Input, IterableChangeRecord, IterableDiffer, IterableDiffers, NgIterable, OnDestroy, OnInit,
  QueryList, TemplateRef, TrackByFunction, ViewChild, ViewContainerRef, ViewEncapsulation
} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {ColumnDefDirective} from "./directives/ColumnDef.directive";
import {DataRowDefDirective} from "./directives/DataRowDef.directive";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HeaderRowDefDirective} from "./directives/HeaderRowDef.directive";
import {takeUntil} from "rxjs/operators";
import {HeaderCellDefDirective} from "./directives/HeaderCellDef.directive";
import {CellOutletDirective} from "./directives/CellOutlet.directive";
import {RowViewRef} from "./classes/abstract/RowViewRef";
import {DataCellDefDirective} from "./directives/DataCellDef.directive";
import {RestTableDataSource} from "./classes/RestTableDataSource";
import {CustomTableActionsDirective} from "./directives/CustomTableActions.directive";
import {IXlsxExportConfig} from "../xlsx-export/classes/interfaces/Xlsx";
import {Storage} from "../../storage/Storage";
import {DataSourcePaginatorComponent} from "./components/DataSourcePaginator.component";
import {
  CellOutletRowContext, CollectionViewer, ColumnSetup, TableColumnsSetup,
  TableFilterNameMapping
} from "./classes/interfaces/DataTable";

export const TABLE_SETUP_STORAGE_PREFIX: string = "tableSetup.";

@Component({
  selector: "data-table",
  exportAs: "cdkTable",
  templateUrl: require("./DataTable.template.pug"),
  styleUrls: [require("./DataTable.less").toString()],
  host: {"class": "data-table"},
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent<T> implements CollectionViewer, OnInit, OnDestroy, AfterContentInit, AfterContentChecked {
  private _onDestroy: Subject<void> = new Subject<void>();
  private _headerRowDefChanged: boolean = false;
  private _data: NgIterable<T> = [];
  private _renderChangeSubscription: Subscription;
  private _columnDefsByName = new Map<string, ColumnDefDirective>();
  private _dataDiffer: IterableDiffer<T>;
  private _dataSource: RestTableDataSource<T>;
  private _differs: IterableDiffers;
  private _changeDetectorRef: ChangeDetectorRef;
  private _viewChange: Observable<{ start: number; end: number }>;
  private _columnSetup: TableColumnsSetup;

  @Input("tableId")
  public tableId: string;

  @Input("trackBy")
  public trackByFn: TrackByFunction<T>;

  @Input("dataSource")
  public set dataSource(dataSource: RestTableDataSource<T>) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }

  public get dataSource(): RestTableDataSource<T> {
    return this._dataSource;
  }

  @Input("exportConfig")
  public exportConfig: IXlsxExportConfig = null;

  @Input("filterMapping")
  public filterMapping: TableFilterNameMapping = null;

  @Input("disableFilter")
  public disableFilter: boolean = false;

  @Input("disablePagination")
  public disablePagination: boolean = false;

  @ViewChild("headerRowPlaceHolder", {read: ViewContainerRef})
  public headerRowPlaceHolderView: ViewContainerRef;

  @ViewChild("dataRowPlaceHolder", {read: ViewContainerRef})
  public dataRowPlaceHolderView: ViewContainerRef;

  @ViewChild(HeaderRowDefDirective)
  public headerRowDef: HeaderRowDefDirective;

  @ViewChild(DataSourcePaginatorComponent)
  public paginator: DataSourcePaginatorComponent<T>;

  @ViewChild(DataRowDefDirective)
  public dataRowDef: DataRowDefDirective<T>;

  @ContentChild(CustomTableActionsDirective, {read: TemplateRef})
  public customTableActions: TemplateRef<any>;

  @ContentChildren(ColumnDefDirective)
  public contentColumnDefs: QueryList<ColumnDefDirective>;

  public get viewChange(): Observable<{ start: number; end: number }> {
    return this._viewChange;
  }

  public get columnSetup(): TableColumnsSetup {
    return this._columnSetup;
  }

  public set columnSetup(setup: TableColumnsSetup) {
    this._columnSetup = setup;
    this._renderUpdatedColumns();
  }

  public get displayedColumnIds(): string[] {
    return this._columnSetup
      .filter((cs: ColumnSetup) => cs.visible)
      .map((cs: ColumnSetup) => cs.id);
  }

  constructor(differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef) {
    this._differs = differs;
    this._changeDetectorRef = changeDetectorRef;
    this._viewChange = new BehaviorSubject<{ start: number, end: number }>({start: 0, end: Number.MAX_VALUE});
  }

  public ngOnInit() {
    this._dataDiffer = this._differs.find([]).create(this.trackByFn);

    if (this.headerRowDef) {
      this._headerRowDefChanged = true;
    }
  }

  public ngOnDestroy() {
    this.dataRowPlaceHolderView.clear();
    this.headerRowPlaceHolderView.clear();
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public ngAfterContentInit() {
    // The view needs a tiny amount of time to breathe and get ready
    // before inintializing the datasource.
    if (this.dataSource && !this.dataSource.isInitialized) {
      let t = setTimeout(() => {
        this.dataSource.update();
        clearTimeout(t);
      }, 50);
    }
  }

  public ngAfterContentChecked() {
    if (this.paginator) {
      this.paginator.dataSource = this.dataSource;
    }

    this._cacheColumnDefs();

    if (this._headerRowDefChanged) {
      let colSetup: TableColumnsSetup = Storage.get(TABLE_SETUP_STORAGE_PREFIX + this.tableId, null);
      if (colSetup == null) {
        this.columnSetup = this.contentColumnDefs.map((def: ColumnDefDirective) => {
          return {id: def.columnId, visible: true};
        });
      } else {
        this.columnSetup = colSetup;
      }
    }

    this._renderUpdatedColumns();

    if (this._headerRowDefChanged) {
      this._renderHeaderRow();
      this._headerRowDefChanged = false;
    }

    if (this.dataSource && !this._renderChangeSubscription) {
      this._observeRenderChanges();
    }
  }

  private _switchDataSource(dataSource: RestTableDataSource<T>) {
    this._data = [];

    if (this._renderChangeSubscription) {
      this._renderChangeSubscription.unsubscribe();
      this._renderChangeSubscription = null;
    }

    if (!dataSource) {
      this.dataRowPlaceHolderView.clear();
    }

    this._dataSource = dataSource;

    if (this.paginator) {
      this.paginator.dataSource = this._dataSource;
    }
  }

  private _cacheColumnDefs() {
    this._columnDefsByName.clear();

    const columnDefs = this.contentColumnDefs ? this.contentColumnDefs.toArray() : [];

    columnDefs.forEach(columnDef => {
      if (this._columnDefsByName.has(columnDef.columnId)) {
        throw new Error(`Duplicate column definition id provided: "${columnDef.columnId}".`);
      }
      this._columnDefsByName.set(columnDef.columnId, columnDef);
    });
  }

  private _renderUpdatedColumns() {
    if (this.dataRowDef.getColumnsDiff() != null) {
      this._dataDiffer.diff([]);

      this.dataRowPlaceHolderView.clear();
      this._renderRowChanges();
    }

    if (this.headerRowDef && this.headerRowDef.getColumnsDiff()) {
      this._renderHeaderRow();
    }
  }

  private _renderHeaderRow() {
    if (this.headerRowPlaceHolderView.length > 0) {
      this.headerRowPlaceHolderView.clear();
    }

    const cells = this._getHeaderCellTemplatesForRow(this.headerRowDef);
    if (cells.length !== 0) {
      this.headerRowPlaceHolderView.createEmbeddedView(this.headerRowDef.template, {cells});

      if (CellOutletDirective.mostRecentCellOutlet) {
        cells.forEach((cell: HeaderCellDefDirective) => {
          CellOutletDirective.mostRecentCellOutlet.viewContainer.createEmbeddedView(cell.template, {});
        });
      }

      this._changeDetectorRef.markForCheck();
    }
  }

  private _renderRowChanges() {
    const changes = this._dataDiffer.diff(this._data);
    if (changes) {
      changes.forEachOperation(
        (record: IterableChangeRecord<T>, adjustedPreviousIndex: number, currentIndex: number) => {
          if (record.previousIndex == null) {
            this._insertRow(record.item, currentIndex);
          } else if (currentIndex == null) {
            this.dataRowPlaceHolderView.remove(adjustedPreviousIndex);
          } else {
            const view = this.dataRowPlaceHolderView.get(adjustedPreviousIndex);
            this.dataRowPlaceHolderView.move(view!, currentIndex);
          }
        });

      // Update the meta context of a row's context data (index, count, first, last, ...)
      this._updateRowIndexContext();

      // Update rows that did not get added/removed/moved but may have had their identity changed,
      // e.g. if trackBy matched data on some property but the actual data reference changed.
      changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
        const rowView = this.dataRowPlaceHolderView.get(record.currentIndex!) as RowViewRef<T>;
        rowView.context.$implicit = record.item;
      });
    }
  }

  private _observeRenderChanges() {
    this._renderChangeSubscription = this.dataSource.dataSubject.pipe(takeUntil(this._onDestroy))
      .subscribe(data => {
        this._data = data;
        this._renderRowChanges();
      });
  }

  private _insertRow(item: T, currentIndex: number) {
    const context: CellOutletRowContext<T> = {$implicit: item};

    this.dataRowPlaceHolderView.createEmbeddedView(this.dataRowDef.template, context, currentIndex);

    if (CellOutletDirective.mostRecentCellOutlet) {
      this._getCellTemplatesForRow(this.dataRowDef).forEach((cell: DataCellDefDirective) => {
        CellOutletDirective.mostRecentCellOutlet.viewContainer.createEmbeddedView(cell.template, context);
      });
    }

    this._changeDetectorRef.markForCheck();
  }

  private _updateRowIndexContext() {
    let count: number = this.dataRowPlaceHolderView.length;
    for (let index = 0; index < count; index++) {
      const viewRef = this.dataRowPlaceHolderView.get(index) as RowViewRef<T>;
      viewRef.context.index = index;
      viewRef.context.count = count;
      viewRef.context.first = index === 0;
      viewRef.context.last = index === count - 1;
      viewRef.context.even = index % 2 === 0;
      viewRef.context.odd = !viewRef.context.even;
    }
  }

  private _getHeaderCellTemplatesForRow(headerRowDef: HeaderRowDefDirective): HeaderCellDefDirective[] {
    if (!headerRowDef || !headerRowDef.columnIds) {
      return [];
    }
    return headerRowDef.columnIds.map((columnId: string) => {
      const column: ColumnDefDirective = this._columnDefsByName.get(columnId);

      if (!column) {
        throw new Error(`Could not find column with id "${columnId}".`);
      }

      return column.headerCellDef;
    });
  }

  private _getCellTemplatesForRow(row: DataRowDefDirective<T>): DataCellDefDirective[] {
    if (row.columnIds) {
      return row.columnIds.map((columnId: string) => {
        const column: ColumnDefDirective = this._columnDefsByName.get(columnId);

        if (!column) {
          throw new Error(`Could not find column with id "${columnId}".`);
        }

        return column.cellDef;
      });
    } else {
      return [];
    }
  }
}
