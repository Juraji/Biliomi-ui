import {NgModule, Type} from "@angular/core";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule
} from "@angular/material";
import {ArrayPageSlicePipe} from "./ArrayPageSlice.pipe";

const NG_MATERIAL_MODULES: Type<any>[] = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatTableModule,
  MatListModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatExpansionModule,
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
