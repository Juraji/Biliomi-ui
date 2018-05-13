import { NgModule, Type } from "@angular/core";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatDatepickerModule } from "@angular/material";

const DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: "LLL"
    },
    display: {
        dateInput: "LLL",
        monthYearLabel: "MMM Do Y",
        dateA11yLabel: "LLL",
        monthYearA11yLabel: "MMMM Do Y"
    }
};

const MODULE_EXPORTS: Type<any>[] = [
    MatMomentDateModule,
    MatDatepickerModule
];

@NgModule({
    imports: MODULE_EXPORTS,
    exports: MODULE_EXPORTS,
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
        {provide: MAT_DATE_LOCALE, useValue: "en-GB"}
    ]
})
export class NgMaterialDatesModule {
}
