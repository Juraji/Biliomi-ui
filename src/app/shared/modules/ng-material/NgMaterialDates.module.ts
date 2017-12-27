import {NgModule, Type} from "@angular/core";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import * as material from "@angular/material";
import {MAT_DATE_FORMATS, MatDateFormats} from "@angular/material";

const DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "LL",
    monthYearLabel: "MMM Do Y",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM Do Y"
  }
};

const MODULE_EXPORTS: Type<any>[] = [
  MatMomentDateModule,
  material.MatDatepickerModule,
];

@NgModule({
  imports: MODULE_EXPORTS,
  exports: MODULE_EXPORTS,
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
  ]
})
export class NgMaterialDatesModule {
}
