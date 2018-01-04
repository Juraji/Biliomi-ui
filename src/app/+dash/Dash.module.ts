import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {DashComponent} from "./Dash.component";
import {NavChannelStatusComponent} from "./declarations/NavChannelStatus.component";
import {NavAuthBarComponent} from "./declarations/NavAuthBar.component";
import {NavRemoteManagementComponent} from "./declarations/NavRemoteManagement.component";
import {ChatComponent} from "./declarations/Chat.component";
import {PowerManagementDialogComponent} from "./declarations/PowerManagementDialog.component";
import {BreadCrumbsComponent} from "./declarations/BreadCrumbs.component";
import {PageLoadingBarComponent} from "./declarations/PageLoadingBar.component";
import {VoiceCommandsModule} from "./voice-commands/VoiceCommands.module";

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
      },
      {
        path: "games",
        loadChildren: "./+games/Games.module#GamesModule",
        data: {breadCrumbName: "Games"}
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    VoiceCommandsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    DashComponent,
    NavChannelStatusComponent,
    NavAuthBarComponent,
    NavRemoteManagementComponent,
    PowerManagementDialogComponent,
    BreadCrumbsComponent,
    PageLoadingBarComponent,
    ChatComponent
  ],
  entryComponents: [PowerManagementDialogComponent]
})
export class DashModule {
}
