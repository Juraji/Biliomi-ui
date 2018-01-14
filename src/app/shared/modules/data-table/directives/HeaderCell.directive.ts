import {Directive, ElementRef} from "@angular/core";
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
  constructor(columnDef: ColumnDefDirective, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}
