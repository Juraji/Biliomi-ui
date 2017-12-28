import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/Shared.module";
import {SystemSettingsComponent} from "./SystemSettings.component";

const ROUTES: Routes = [
  {
    path: "",
    component: SystemSettingsComponent,
    children: [
      {
        path: "bot",
        loadChildren: "./+bot-settings/BotSettings.module#BotSettingsModule",
        data: {breadCrumbName: "Bot Settings"}
      },
      {
        path: "templates",
        loadChildren: "./+template-settings/TemplateSettings.module#TemplateSettingsModule",
        data: {breadCrumbName: "Templates"}
      },
      {
        path: "communites",
        loadChildren: "./+communities/Communities.module#CommunitiesModule",
        data: {breadCrumbName: "Communities"}
      },
      {
        path: "chat-logs",
        loadChildren: "./+chat-logs/ChatLogs.module#ChatLogsModule",
        data: {breadCrumbName: "Chat Logs"}
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
    SystemSettingsComponent
  ],
  entryComponents: []
})
export class SystemSettingsModule {
}
