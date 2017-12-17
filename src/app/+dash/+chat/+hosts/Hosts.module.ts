import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/Shared.module";
import {HostsComponent} from "./Hosts.component";
import {HostFormComponent} from "./declarations/HostForm.component";
import {HostRecordsTableComponent} from "./declarations/HostRecordsTable.component";
import {HostWatchSettingsComponent} from "./declarations/HostWatchSettings.component";

const ROUTES: Routes = [
  {
    path: "",
    component: HostsComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    HostsComponent,
    HostFormComponent,
    HostRecordsTableComponent,
    HostWatchSettingsComponent
  ],
  entryComponents: []
})
export class HostsModule {
}
