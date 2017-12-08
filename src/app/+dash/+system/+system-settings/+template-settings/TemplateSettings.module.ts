import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../../shared/Shared.module";
import {TemplateSettingsComponent} from "./TemplateSettings.component";
import {EditTemplateModalComponent} from "./declarations/EditTemplateModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: TemplateSettingsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    TemplateSettingsComponent,
    EditTemplateModalComponent
  ],
  entryComponents: [EditTemplateModalComponent]
})
export class TemplateSettingsModule {
}
