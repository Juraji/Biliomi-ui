import {ModuleWithProviders, NgModule, PipeTransform, Type} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgMaterialModule} from "./modules/ng-material/NgMaterial.module";
import {BiliomiModule} from "./modules/biliomi/Biliomi.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigService} from "./services/Config.service";

const SHARED_PIPES: Type<PipeTransform>[] = [];

const SHARED_COMPONENTS: Type<any>[] = [];

const SHARED_DIRECTIVES: Type<any>[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    BiliomiModule.forRoot()
  ],
  declarations: []
    .concat(SHARED_PIPES)
    .concat(SHARED_COMPONENTS)
    .concat(SHARED_DIRECTIVES),
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    BiliomiModule
  ].concat(SHARED_PIPES)
    .concat(SHARED_COMPONENTS)
    .concat(SHARED_DIRECTIVES)
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ConfigService
      ]
    };
  }
}
