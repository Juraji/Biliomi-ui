import {Directive, ElementRef, HostBinding} from "@angular/core";
import {BaseCell} from "../classes/abstract/BaseCell";
import {ColumnDefDirective} from "./ColumnDef.directive";

@Directive({
  selector: "header-cell",
  host: {
    "class": "header-cell",
    "role": "columnheader"
  }
})
export class HeaderCellDirective extends BaseCell {

  @HostBinding("style.width.px")
  public get targetWidth(): number {
    return this._targetWidth;
  }

  constructor(columnDef: ColumnDefDirective, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}
