import {Component, HostBinding, HostListener, Input, OnInit, Optional} from "@angular/core";
import {AnimationCurves, AnimationDurations} from "@angular/material";
import {animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger} from "@angular/animations";
import {DataTableComponent} from "../DataTable.component";
import {RestTableDataSource} from "../classes/RestTableDataSource";

const SORT_ANIMATION_TRANSITION: string = `${AnimationDurations.ENTERING} ${AnimationCurves.STANDARD_CURVE}`;
const SORT_ANIMATIONS: AnimationTriggerMetadata[] = [
  trigger('indicator', [
    state('ASC', style({transform: 'translateY(0px)'})),
    // 10px is the height of the sort indicator, minus the width of the pointers
    state('DESC', style({transform: 'translateY(10px)'})),
    transition('ASC <=> DESC', animate(SORT_ANIMATION_TRANSITION))
  ]),
  trigger('leftPointer', [
    state('ASC', style({transform: 'rotate(-45deg)'})),
    state('DESC', style({transform: 'rotate(45deg)'})),
    transition('ASC <=> DESC', animate(SORT_ANIMATION_TRANSITION))
  ]),
  trigger('rightPointer', [
    state('ASC', style({transform: 'rotate(45deg)'})),
    state('DESC', style({transform: 'rotate(-45deg)'})),
    transition('ASC <=> DESC', animate(SORT_ANIMATION_TRANSITION))
  ]),
  trigger('indicatorToggle', [
    transition('NONE => ASC', animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: 'translateY(25%)', opacity: 0}),
      style({transform: 'none', opacity: 1})
    ]))),
    transition('ASC => NONE', animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: 'none', opacity: 1}),
      style({transform: 'translateY(-25%)', opacity: 0})
    ]))),
    transition('NONE => DESC', animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: 'translateY(-25%)', opacity: 0}),
      style({transform: 'none', opacity: 1})
    ]))),
    transition('DESC => NONE', animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: 'none', opacity: 1}),
      style({transform: 'translateY(25%)', opacity: 0})
    ]))),
  ])
];

export enum SortHeaderState {
  ASC = "ASC",
  DESC = "DESC",
  NONE = "OFF",
}

@Component({
  selector: "mat-header-cell[sortHeader]",
  templateUrl: require("./SortHeader.template.pug"),
  styleUrls: [require("./SortHeader.less").toString()],
  animations: SORT_ANIMATIONS
})
export class SortHeaderDirective implements OnInit {
  private _tableDataSource: RestTableDataSource<any>;
  private _sort: SortHeaderState = SortHeaderState.NONE;

  @Input("sortHeader")
  public objectPath: string;

  @Input("sortByDefault")
  public sortByDefault: SortHeaderState = null;

  @Input("doInitialUpdate")
  public doInitialUpdate: boolean = true;

  constructor(@Optional() table: DataTableComponent<any>) {
    if (table == null) {
      throw new Error("The SortHeaderDirective can only be used within a DataTableComponent");
    }

    this._tableDataSource = table.tableDataSource;
  }

  public ngOnInit() {
    if (this.objectPath == null) {
      throw new Error("No object path supplied for sort header!");
    }


    if (this.sortByDefault != null) {
      this._applySort(this.sortByDefault, this.doInitialUpdate);
    }
  }

  @HostBinding("class.mat-sort-header-sorted")
  public get isSorted(): boolean {
    return this._sort !== SortHeaderState.NONE;
  }

  @HostListener("click")
  public handleClick() {
    switch (this._sort) {
      case SortHeaderState.NONE:
        this._applySort(SortHeaderState.ASC, true);
        break;
      case SortHeaderState.ASC:
        this._applySort(SortHeaderState.DESC, true);
        break;
      case SortHeaderState.DESC:
        this._applySort(SortHeaderState.NONE, true);
        break;
    }
  }

  private _applySort(sort: SortHeaderState, updateData: boolean) {
    this._sort = sort;
    if (SortHeaderState.NONE === sort) {
      this._tableDataSource.sortBuilder.remove(this.objectPath);
    } else {
      this._tableDataSource.sortBuilder.add(this.objectPath, SortHeaderState.DESC === sort);
    }

    if (updateData) {
      this._tableDataSource.update()
    }
  }
}
