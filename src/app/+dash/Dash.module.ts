import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {DashComponent} from "./Dash.component";
import {NavChannelInfoComponent} from "./declarations/NavChannelInfo.component";
import {NavAuthBarComponent} from "./declarations/NavAuthBar.component";
import {NavFollowerStatsComponent} from "./declarations/NavFollowerStats.component";
import {NavRemoteManagementComponent} from "./declarations/NavRemoteManagement.component";
import {ChatComponent} from "./declarations/Chat.component";

const ROUTES: Routes = [
  {
    path: "",
    component: DashComponent,
    children: [
      {
        path: "home",
        loadChildren: "./+home/Home.module#HomeModule"
      },
      {
        path: "commands",
        loadChildren: "./+commands/Commands.module#CommandsModule"
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
    NavRemoteManagementComponent,
    ChatComponent
  ]
})
export class DashModule {
}
