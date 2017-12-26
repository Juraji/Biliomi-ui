import {ColumnDefDirective} from "../../directives/ColumnDef.directive";
import {ElementRef} from "@angular/core";

export const BUTTON_WIDTH: number = 40;

export abstract class BaseCell {
  protected readonly _targetWidth: number;

  constructor(columnDef: ColumnDefDirective, elementRef: ElementRef) {
    elementRef.nativeElement.classList.add(`column-${columnDef.cssFriendlyName}`);

    if (columnDef != null && columnDef.buttonCount != null) {
      elementRef.nativeElement.classList.add("buttons-column");
      this._targetWidth = BUTTON_WIDTH * columnDef.buttonCount;
    }
  }
}
