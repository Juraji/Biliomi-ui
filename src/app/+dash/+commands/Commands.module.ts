import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/Shared.module";
import {CommandsComponent} from "./Commands.component";

const ROUTES: Routes = [
  {
    path: "",
    component: CommandsComponent,
    children: [
      {
        path: "custom-commands",
        loadChildren: "./+custom-commands/CustomCommands.module#CustomCommandsModule",
        data: {crumbName: "Custom Commands"}
      },
      {
        path: "system-commands",
        loadChildren: "./+system-commands/SystemCommands.module#SystemCommandsModule",
        data: {crumbName: "System Commands"}
      },
      {
        path: "command-history",
        loadChildren: "./+command-history/CommandHistory.module#CommandHistoryModule",
        data: {crumbName: "Command History"}
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
    CommandsComponent
  ],
  entryComponents: []
})
export class CommandsModule {
}
