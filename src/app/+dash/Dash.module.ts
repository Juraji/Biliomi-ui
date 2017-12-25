import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {DashComponent} from "./Dash.component";
import {NavChannelInfoComponent} from "./declarations/NavChannelInfo.component";
import {NavAuthBarComponent} from "./declarations/NavAuthBar.component";
import {NavFollowerStatsComponent} from "./declarations/NavFollowerStats.component";
import {NavRemoteManagementComponent} from "./declarations/NavRemoteManagement.component";
import {ChatComponent} from "./declarations/Chat.component";
import {PowerManagementDialogComponent} from "./declarations/PowerManagementDialog.component";
import {BreadCrumbsComponent} from "./declarations/BreadCrumbs.component";
import {NavFollowerStatsModalComponent} from "./declarations/NavFollowerStatsModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: DashComponent,
    children: [
      {
        path: "home",
        loadChildren: "./+home/Home.module#HomeModule",
        data: {breadCrumbName: "Home"}
      },
      {
        path: "commands",
        loadChildren: "./+commands/Commands.module#CommandsModule",
        data: {breadCrumbName: "Commands"}
      },
      {
        path: "system",
        loadChildren: "./+system/System.module#SystemModule",
        data: {breadCrumbName: "System"}
      },
      {
        path: "chat",
        loadChildren: "./+chat/Chat.module#ChatModule",
        data: {breadCrumbName: "Chat"}
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
    NavFollowerStatsModalComponent,
    NavRemoteManagementComponent,
    PowerManagementDialogComponent,
    BreadCrumbsComponent,
    ChatComponent,
  ],
  entryComponents: [
    PowerManagementDialogComponent,
    NavFollowerStatsModalComponent
  ]
})
export class DashModule {
}
