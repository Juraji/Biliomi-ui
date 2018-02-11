import {Component, HostBinding, HostListener, Input, OnInit, Optional} from "@angular/core";
import {AnimationCurves, AnimationDurations} from "@angular/material";
import {animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger} from "@angular/animations";
import {DataTableComponent} from "../DataTable.component";
import {RestTableDataSource} from "../classes/RestTableDataSource";
import {SortHeaderState} from "../classes/interfaces/SortHeaderState.enum";

import "./SortProperty.less";

const SORT_ANIMATION_TRANSITION: string = `${AnimationDurations.ENTERING} ${AnimationCurves.STANDARD_CURVE}`;
const SORT_ANIMATIONS: AnimationTriggerMetadata[] = [
  trigger("indicator", [
    state("ASC", style({transform: "translateY(0px)"})),
    // 10px is the height of the sort indicator, minus the width of the pointers
    state("DESC", style({transform: "translateY(10px)"})),
    transition("ASC <=> DESC", animate(SORT_ANIMATION_TRANSITION))
  ]),
  trigger("leftPointer", [
    state("ASC", style({transform: "rotate(-45deg)"})),
    state("DESC", style({transform: "rotate(45deg)"})),
    transition("ASC <=> DESC", animate(SORT_ANIMATION_TRANSITION))
  ]),
  trigger("rightPointer", [
    state("ASC", style({transform: "rotate(45deg)"})),
    state("DESC", style({transform: "rotate(-45deg)"})),
    transition("ASC <=> DESC", animate(SORT_ANIMATION_TRANSITION))
  ]),
  trigger("indicatorToggle", [
    transition("NONE => ASC", animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: "translateY(25%)", opacity: 0}),
      style({transform: "none", opacity: 1})
    ]))),
    transition("ASC => NONE", animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: "none", opacity: 1}),
      style({transform: "translateY(-25%)", opacity: 0})
    ]))),
    transition("NONE => DESC", animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: "translateY(-25%)", opacity: 0}),
      style({transform: "none", opacity: 1})
    ]))),
    transition("DESC => NONE", animate(SORT_ANIMATION_TRANSITION, keyframes([
      style({transform: "none", opacity: 1}),
      style({transform: "translateY(25%)", opacity: 0})
    ])))
  ])
];

@Component({
  selector: "header-cell[sortProperty]",
  templateUrl: require("./SortProperty.template.html"),
  animations: SORT_ANIMATIONS
})
export class SortPropertyDirective<T> implements OnInit {
  private _parentTable: DataTableComponent<any>;
  private _sortState: SortHeaderState = SortHeaderState.NONE;

  @Input("sortProperty")
  public objectPath: string;

  @Input("sortDefault")
  public sortDefault: SortHeaderState = null;

  private get dataSource(): RestTableDataSource<T> {
    if (this._parentTable) {
      return this._parentTable.dataSource;
    } else {
      return null;
    }
  }

  public get sortIndex(): number {
    let ds = this.dataSource;
    if (ds) {
      return ds.sortBuilder.indexOf(this.objectPath) + 1;
    } else {
      return 0;
    }
  }

  constructor(@Optional() parentTable: DataTableComponent<any>) {
    if (parentTable == null) {
      throw new Error("The SortPropertyDirective can only be used within a DataTableComponent");
    }

    this._parentTable = parentTable;
  }

  public ngOnInit() {
    if (this.objectPath == null) {
      throw new Error("No object path supplied for sort header!");
    }

    if (this.sortDefault != null) {
      this._applySort(this.sortDefault, false);
    }
  }

  @HostBinding("class.sort-header-sorted")
  public get isSorted(): boolean {
    return this._sortState !== SortHeaderState.NONE;
  }

  @HostListener("click")
  public handleClick() {
    switch (this._sortState) {
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
    this._sortState = sort;
    let ds: RestTableDataSource<T> = this.dataSource;

    if (ds != null) {
      if (SortHeaderState.NONE === sort) {
        ds.sortBuilder.remove(this.objectPath);
      } else {
        ds.sortBuilder.add(this.objectPath, SortHeaderState.DESC === sort);
      }

      if (updateData) {
        ds.update();
      }
    }
  }
}
