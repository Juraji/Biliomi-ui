import {NgModule, Type} from "@angular/core";
import {ArrayPageSlicePipe} from "./pipes/ArrayPageSlice.pipe";
import * as material from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgMaterialDatesModule} from "./NgMaterialDates.module";

const NG_MATERIAL_MODULES: Type<any>[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  NgMaterialDatesModule,

  material.MatAutocompleteModule,
  material.MatButtonModule,
  material.MatButtonToggleModule,
  material.MatCardModule,
  material.MatChipsModule,
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
  material.MatTooltipModule
];

const NG_MATERIAL_DECLARATIONS: Type<any>[] = [
  ArrayPageSlicePipe,
];

@NgModule({
  imports: NG_MATERIAL_MODULES,
  declarations: NG_MATERIAL_DECLARATIONS,
  exports: [].concat(NG_MATERIAL_MODULES, NG_MATERIAL_DECLARATIONS)

})
export class NgMaterialModule {
}
