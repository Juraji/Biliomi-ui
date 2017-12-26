import {IterableChanges, IterableDiffer, IterableDiffers, OnChanges, SimpleChanges, TemplateRef} from "@angular/core";

export abstract class BaseRowDef implements OnChanges {
  private _columnIds: string[];
  private _template: TemplateRef<any>;
  protected _columnsIdsDiffer: IterableDiffer<string>;
  protected _differs: IterableDiffers;

  public get template(): TemplateRef<any> {
    return this._template;
  }

  public set columnIds(columnIds: string[]) {
    this._columnIds =  columnIds;
  }

  public get columnIds(): string[] {
    return this._columnIds;
  }

  constructor(template: TemplateRef<any>, differs: IterableDiffers) {
    this._template = template;
    this._differs = differs;
    this._columnsIdsDiffer = differs.find([]).create();
  }

  public ngOnChanges(changes: SimpleChanges) {
    const columns = changes['columnIds'].currentValue || [];
    if (!this._columnsIdsDiffer) {
      this._columnsIdsDiffer = this._differs.find(columns).create();
      this._columnsIdsDiffer.diff(columns);
    }
  }

  public getColumnsDiff(): IterableChanges<string> {
    return this._columnsIdsDiffer.diff(this._columnIds);
  }
}
