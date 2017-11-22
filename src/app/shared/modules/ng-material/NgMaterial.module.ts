import {NgModule, Type} from "@angular/core";
import {ArrayPageSlicePipe} from "./ArrayPageSlice.pipe";
import * as material from "@angular/material";

const NG_MATERIAL_MODULES: Type<any>[] = [
  material.MatCardModule,
  material.MatFormFieldModule,
  material.MatInputModule,
  material.MatButtonModule,
  material.MatIconModule,
  material.MatSidenavModule,
  material.MatGridListModule,
  material.MatButtonToggleModule,
  material.MatPaginatorModule,
  material.MatTableModule,
  material.MatListModule,
  material.MatAutocompleteModule,
  material.MatSnackBarModule,
  material.MatExpansionModule,
];

const NG_MATERIAL_DECLARATIONS: Type<any>[] = [
  ArrayPageSlicePipe
];

@NgModule({
  imports: NG_MATERIAL_MODULES,
  declarations: NG_MATERIAL_DECLARATIONS,
  exports: [].concat(NG_MATERIAL_MODULES, NG_MATERIAL_DECLARATIONS)
})
export class NgMaterialModule {
}
