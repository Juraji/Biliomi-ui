import { Directive, ElementRef } from "@angular/core";
import { ColumnDefDirective } from "./ColumnDef.directive";
import { BaseCell } from "../classes/abstract/BaseCell";

@Directive({
    selector: "data-cell",
    host: {
        "class": "data-cell",
        "role": "gridcell"
    }
})
export class DataCellDirective extends BaseCell {
    constructor(columnDef: ColumnDefDirective, elementRef: ElementRef) {
        super(columnDef, elementRef);
    }
}
