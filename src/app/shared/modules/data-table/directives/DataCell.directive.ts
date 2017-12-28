import {Directive, ElementRef, HostBinding} from "@angular/core";
import {ColumnDefDirective} from "./ColumnDef.directive";
import {BaseCell} from "../classes/abstract/BaseCell";

@Directive({
  selector: "data-cell",
  host: {
    "class": "data-cell",
    "role": "gridcell"
  }
})
export class DataCellDirective extends BaseCell {

  @HostBinding("style.width.px")
  public get targetWidth(): number {
    return this._targetWidth;
  }

  constructor(columnDef: ColumnDefDirective, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}
