import {ContentChild, Directive, Input} from "@angular/core";
import {DataCellDefDirective} from "./DataCellDef.directive";
import {HeaderCellDefDirective} from "./HeaderCellDef.directive";

@Directive({selector: "[columnDef]"})
export class ColumnDefDirective {
  private _columnId: string;
  private _cssFriendlyName: string;

  @Input("columnDef")
  public set columnDef(columnId: string) {
    this._columnId = columnId;
    this._cssFriendlyName = columnId
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-");
  }

  @Input("buttonsColumn")
  public buttonCount: number = null;

  public get columnId() {
    return this._columnId;
  }

  public get cssFriendlyName(): string {
    return this._cssFriendlyName;
  }

  @ContentChild(HeaderCellDefDirective)
  public headerCellDef: HeaderCellDefDirective;

  @ContentChild(DataCellDefDirective)
  public cellDef: DataCellDefDirective;
}
