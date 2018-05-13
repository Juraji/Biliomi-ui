import { Directive, TemplateRef } from "@angular/core";

@Directive({selector: "[headerCellDef]"})
export class HeaderCellDefDirective {
    constructor(template: TemplateRef<any>) {
        this._template = template;
    }

    private _template: TemplateRef<any>;

    public get template(): TemplateRef<any> {
        return this._template;
    }
}
