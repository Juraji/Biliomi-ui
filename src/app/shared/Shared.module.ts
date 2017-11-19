import {ModuleWithProviders, NgModule, PipeTransform, Type} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgMaterialModule} from "./modules/ng-material/NgMaterial.module";
import {BiliomiModule} from "./modules/biliomi/Biliomi.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigService} from "./services/Config.service";
import {AuthService} from "./services/Auth.service";
import {AuthGuard} from "./router-guards/Auth.guard";
import {HttpClientModule} from "@angular/common/http";
import {TwitchUserLinkPipe} from "./pipes/TwitchUserLinkPipe.";
import {TimePipe} from "./pipes/TimePipe";
import {DatePipe} from "./pipes/DatePipe";

const SHARED_PIPES: Type<PipeTransform>[] = [
  TwitchUserLinkPipe,
  DatePipe,
  TimePipe
];

const SHARED_COMPONENTS: Type<any>[] = [];

const SHARED_DIRECTIVES: Type<any>[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgMaterialModule, BiliomiModule.forRoot()
  ],
  declarations: []
    .concat(SHARED_PIPES)
    .concat(SHARED_COMPONENTS)
    .concat(SHARED_DIRECTIVES),
  exports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgMaterialModule, BiliomiModule]
    .concat(SHARED_PIPES)
    .concat(SHARED_COMPONENTS)
    .concat(SHARED_DIRECTIVES)
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // Services
        ConfigService,
        AuthService,

        // Guards
        AuthGuard
      ]
    };
  }
}
