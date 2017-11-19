import {NgModule, Type} from "@angular/core";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule
} from "@angular/material";

const NG_MATERIAL_MODULES: Type<any>[] = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatGridListModule,
  MatButtonToggleModule
];

@NgModule({
  imports: NG_MATERIAL_MODULES,
  exports: NG_MATERIAL_MODULES
})
export class NgMaterialModule {
}
