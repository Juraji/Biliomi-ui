import { ContentChild, Directive, Input } from "@angular/core";
import { DataCellDefDirective } from "./DataCellDef.directive";
import { HeaderCellDefDirective } from "./HeaderCellDef.directive";

@Directive({selector: "[columnDef]"})
export class ColumnDefDirective {
    @Input("buttonsColumn")
    public buttonCount: number = null;
    @ContentChild(HeaderCellDefDirective)
    public headerCellDef: HeaderCellDefDirective;
    @ContentChild(DataCellDefDirective)
    public cellDef: DataCellDefDirective;

    private _columnId: string;

    public get columnId() {
        return this._columnId;
    }

    private _cssFriendlyName: string;

    public get cssFriendlyName(): string {
        return this._cssFriendlyName;
    }

    @Input("columnDef")
    public set columnDef(columnId: string) {
        this._columnId = columnId;
        this._cssFriendlyName = columnId
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, "-");
    }
}
