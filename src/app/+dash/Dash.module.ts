import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {DashComponent} from "./Dash.component";
import {NavChannelInfoComponent} from "./declarations/NavChannelInfo.component";
import {NavAuthBarComponent} from "./declarations/NavAuthBar.component";
import {NavFollowerStatsComponent} from "./declarations/NavFollowerStats.component";
import {NavRemoteManagementComponent} from "./declarations/NavRemoteManagement.component";

const ROUTES: Routes = [
  {
    path: "",
    component: DashComponent,
    children: [
      {
        path: "home",
        loadChildren: "./+home/Home.module#HomeModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    DashComponent,
    NavChannelInfoComponent,
    NavAuthBarComponent,
    NavFollowerStatsComponent,
    NavRemoteManagementComponent
  ]
})
export class DashModule {
}
