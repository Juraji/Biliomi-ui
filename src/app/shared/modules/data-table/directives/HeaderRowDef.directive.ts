import { Directive, IterableDiffers, TemplateRef } from "@angular/core";
import { BaseRowDef } from "../classes/abstract/BaseRowDef";

@Directive({
    selector: "[headerRowDef]",
    inputs: ["columnIds: headerRowDef"]
})
export class HeaderRowDefDirective extends BaseRowDef {

    constructor(template: TemplateRef<any>, differs: IterableDiffers) {
        super(template, differs);
    }
}
