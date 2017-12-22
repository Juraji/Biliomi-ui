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
import {UserGroupSelectComponent} from "./components/UserGroupSelect.component";
import {ConfirmDialogComponent} from "./components/ConfirmDialog.component";
import {CaseToWordPipe} from "./pipes/CaseToWord.pipe";
import {EditUserLinkPipe} from "./pipes/EditUserLink.pipe";
import {EditTemplateButtonComponent} from "./components/EditTemplateButton.component";
import {UserDisplayComponent} from "./components/UserDisplay.component";
import {UserAutoCompleteComponent} from "./components/UserAutoComplete.component";
import {TrimPipe} from "./modules/biliomi/pipes/Trim.pipe";
import {NumberArrayPipe} from "./pipes/NumberArray.pipe";
import {DataTableModule} from "./modules/data-table/DataTable.module";
import {BooleanPipe} from "./pipes/Boolean.pipe";
import {CommunityChipListComponent} from "./components/CommunityChipList.component";
import {ObjectSortPipe} from "./pipes/ObjectSort.pipe";

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
  CommandFormComponent,
  UserGroupSelectComponent,
  ConfirmDialogComponent,
  EditTemplateButtonComponent,
  UserDisplayComponent,
  UserAutoCompleteComponent,
  CommunityChipListComponent
];

const SHARED_DIRECTIVES: Type<any>[] = [];

const SHARED_PROVIDERS: Type<any>[] = [
  // Services
  ConfigService,
  AuthService,

  // Guards
  AuthenticatedGuard
];

const SHARED_MODULES: Type<any>[] = [
  CommonModule,
  RouterModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  NgMaterialModule,
  BiliomiModule,
  DataTableModule
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
  entryComponents: SHARED_COMPONENTS,
  providers: SHARED_PROVIDERS
})
export class SharedModule {
}
