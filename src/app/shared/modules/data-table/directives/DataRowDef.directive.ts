import {Directive, IterableDiffers, TemplateRef} from "@angular/core";
import {BaseRowDef} from "../classes/abstract/BaseRowDef";

@Directive({
  selector: "[dataRowDef]",
  inputs: ["columnIds: dataRowDef"]
})
export class DataRowDefDirective<T> extends BaseRowDef {

  constructor(template: TemplateRef<any>, differs: IterableDiffers) {
    super(template, differs);
  }
}
