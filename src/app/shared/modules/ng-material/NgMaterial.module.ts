import {NgModule, Type} from "@angular/core";
import {ArrayPageSlicePipe} from "./pipes/ArrayPageSlice.pipe";
import * as material from "@angular/material";
import {DataSourceFilterComponent} from "./components/DataSourceFilter.component";

const NG_MATERIAL_MODULES: Type<any>[] = [
  material.MatAutocompleteModule,
  material.MatButtonModule,
  material.MatButtonToggleModule,
  material.MatCardModule,
  material.MatCheckboxModule,
  material.MatChipsModule,
  material.MatDialogModule,
  material.MatExpansionModule,
  material.MatFormFieldModule,
  material.MatGridListModule,
  material.MatIconModule,
  material.MatInputModule,
  material.MatListModule,
  material.MatPaginatorModule,
  material.MatProgressBarModule,
  material.MatProgressSpinnerModule,
  material.MatSelectModule,
  material.MatSidenavModule,
  material.MatSnackBarModule,
  material.MatTableModule,
  material.MatTabsModule,
  material.MatToolbarModule,
];

const NG_MATERIAL_DECLARATIONS: Type<any>[] = [
  ArrayPageSlicePipe,
  DataSourceFilterComponent
];

@NgModule({
  imports: NG_MATERIAL_MODULES,
  declarations: NG_MATERIAL_DECLARATIONS,
  exports: [].concat(NG_MATERIAL_MODULES, NG_MATERIAL_DECLARATIONS)
})
export class NgMaterialModule {
}
