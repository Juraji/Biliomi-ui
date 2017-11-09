import {NgModule, Type} from "@angular/core";
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from "@angular/material";

const NG_MATERIAL_MODULES: Type<any>[] = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: NG_MATERIAL_MODULES,
  exports: NG_MATERIAL_MODULES
})
export class NgMaterialModule {
}
