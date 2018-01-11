import {ModuleWithProviders, NgModule} from "@angular/core";
import {GuardedFormControlDirective} from "./directives/GuardedFormControl.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DirtyFormGuard} from "./router-guards/DirtyForm.guard";
import {FormControlRegisterService} from "./services/FormControlRegister.service";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [GuardedFormControlDirective],
  exports: [GuardedFormControlDirective]
})
export class DirtyFormNavigationGuardModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DirtyFormNavigationGuardModule,
      providers: [
        FormControlRegisterService,
        DirtyFormGuard
      ]
    };
  }
}
