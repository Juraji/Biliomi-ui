import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/Shared.module";
import {SystemSettingsComponent} from "./SystemSettings.component";
import {ChatSettingsComponent} from "./declarations/ChatSettings.component";
import {TimeTrackingSettingsComponent} from "./declarations/TimeTrackingSettings.component";
import {PointsSettingsComponent} from "./declarations/PointsSettings.component";

const ROUTES: Routes = [
  {
    path: "",
    component: SystemSettingsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    SystemSettingsComponent,
    ChatSettingsComponent,
    TimeTrackingSettingsComponent,
    PointsSettingsComponent
  ],
  entryComponents: []
})
export class SystemSettingsModule {
}
