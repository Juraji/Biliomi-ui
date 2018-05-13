import { Directive, ViewContainerRef } from "@angular/core";
import { DataCellDefDirective } from "./DataCellDef.directive";

@Directive({selector: "[cellOutlet]"})
export class CellOutletDirective {
    public static mostRecentCellOutlet: CellOutletDirective = null;
    public cells: DataCellDefDirective[];
    public context: any;
    public viewContainer: ViewContainerRef;

    constructor(viewContainer: ViewContainerRef) {
        this.viewContainer = viewContainer;
        CellOutletDirective.mostRecentCellOutlet = this;
    }
}
