import {ModuleWithProviders, NgModule, PipeTransform, Provider, Type} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgMaterialModule} from "./modules/ng-material/NgMaterial.module";
import {BiliomiModule} from "./modules/biliomi/Biliomi.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigService} from "./services/Config.service";
import {AuthService} from "./services/Auth.service";
import {AuthenticatedGuard} from "./router-guards/Authenticated.guard";
import {HttpClientModule} from "@angular/common/http";
import {TwitchUserLinkPipe} from "./pipes/TwitchUserLink.pipe";
import {TimePipe} from "./pipes/Time.pipe";
import {DatePipe} from "./pipes/Date.pipe";
import {CommandFormComponent} from "./components/CommandForm.component";
import {CaseToWordPipe} from "./pipes/CaseToWord.pipe";
import {EditUserLinkPipe} from "./pipes/EditUserLink.pipe";
import {EditTemplateButtonComponent} from "./components/EditTemplateButton.component";
import {UserDisplayComponent} from "./components/UserDisplay.component";
import {UserAutoCompleteComponent} from "./components/UserAutoComplete.component";
import {TrimPipe} from "./modules/biliomi/pipes/Trim.pipe";
import {NumberArrayPipe} from "./pipes/NumberArray.pipe";
import {BooleanPipe} from "./pipes/Boolean.pipe";
import {ObjectSortPipe} from "./pipes/ObjectSort.pipe";
import {DataTableModule} from "./modules/data-table/DataTable.module";
import {DialogsModule} from "./modules/dialogs/Dialogs.module";
import {UserGroupSelectorComponent} from "./components/UserGroupSelector.component";
import {ChipListInputComponent} from "./components/ChipListInput.component";
import {CommunityChipListComponent} from "./components/CommunityChipList.component";
import {DirtyFormNavigationGuardModule} from "./modules/dirty-form-navigation-guard/DirtyFormNavigationGuard.module";
import {BreadCrumbsModule} from "./modules/breadcrumbs/BreadCrumbs.module";
import {RouteTabsComponent} from "./components/RouteTabs.component";
import {ActionButtonDirective} from "./directives/ActionButton.directive";

const SHARED_PIPES: Type<PipeTransform>[] = [
  TwitchUserLinkPipe,
  DatePipe,
  TimePipe,
  CaseToWordPipe,
  EditUserLinkPipe,
  TrimPipe,
  NumberArrayPipe,
  BooleanPipe,
  ObjectSortPipe
];

const SHARED_COMPONENTS: Type<any>[] = [
  ChipListInputComponent,
  CommandFormComponent,
  CommunityChipListComponent,
  EditTemplateButtonComponent,
  UserAutoCompleteComponent,
  UserDisplayComponent,
  UserGroupSelectorComponent,
  RouteTabsComponent
];

const SHARED_DIRECTIVES: Type<any>[] = [
  ActionButtonDirective
];

const SHARED_PROVIDERS: Provider[] = [
  // Services
  ConfigService,
  AuthService,

  // Guards
  AuthenticatedGuard,

  // Childmodule providers, these implement forRoot for portability
  ...BiliomiModule.forRoot().providers,
  ...DirtyFormNavigationGuardModule.forRoot().providers,
  ...BreadCrumbsModule.forRoot().providers
];

const SHARED_MODULES: Type<any>[] = [
  CommonModule,
  RouterModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  NgMaterialModule,
  BiliomiModule,
  DataTableModule,
  DialogsModule,
  BreadCrumbsModule,
  DirtyFormNavigationGuardModule
];

@NgModule({
  imports: SHARED_MODULES,
  declarations: []
    .concat(SHARED_PIPES)
    .concat(SHARED_COMPONENTS)
    .concat(SHARED_DIRECTIVES),
  exports: SHARED_MODULES
    .concat(SHARED_PIPES)
    .concat(SHARED_COMPONENTS)
    .concat(SHARED_DIRECTIVES),
  entryComponents: SHARED_COMPONENTS
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: SHARED_PROVIDERS
    };
  }
}
