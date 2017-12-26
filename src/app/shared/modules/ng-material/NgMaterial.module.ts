import {NgModule, Type} from "@angular/core";
import {ArrayPageSlicePipe} from "./pipes/ArrayPageSlice.pipe";
import * as material from "@angular/material";
import {MAT_DATE_FORMATS, MatDateFormats} from "@angular/material";
import {ChipListInputComponent} from "./components/ChipListInput.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatMomentDateModule} from "@angular/material-moment-adapter";

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

const NG_MATERIAL_MODULES: Type<any>[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  MatMomentDateModule,

  material.MatAutocompleteModule,
  material.MatButtonModule,
  material.MatButtonToggleModule,
  material.MatCardModule,
  material.MatChipsModule,
  material.MatDatepickerModule,
  material.MatDialogModule,
  material.MatExpansionModule,
  material.MatFormFieldModule,
  material.MatIconModule,
  material.MatInputModule,
  material.MatListModule,
  material.MatMenuModule,
  material.MatPaginatorModule,
  material.MatProgressBarModule,
  material.MatProgressSpinnerModule,
  material.MatRadioModule,
  material.MatSelectModule,
  material.MatSidenavModule,
  material.MatSlideToggleModule,
  material.MatSnackBarModule,
  material.MatSortModule,
  material.MatTableModule,
  material.MatTabsModule,
  material.MatToolbarModule,
  material.MatTooltipModule,
];

const NG_MATERIAL_DECLARATIONS: Type<any>[] = [
  ArrayPageSlicePipe,
  ChipListInputComponent,
];

@NgModule({
  imports: NG_MATERIAL_MODULES,
  declarations: NG_MATERIAL_DECLARATIONS,
  exports: [].concat(NG_MATERIAL_MODULES, NG_MATERIAL_DECLARATIONS),
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
  ]
})
export class NgMaterialModule {
}
