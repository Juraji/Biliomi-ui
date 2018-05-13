import { Directive, TemplateRef } from "@angular/core";

@Directive({selector: "[dataCellDef]"})
export class DataCellDefDirective {
    constructor(template: TemplateRef<any>) {
        this._template = template;
    }

    private _template: TemplateRef<any>;

    public get template(): TemplateRef<any> {
        return this._template;
    }
}
