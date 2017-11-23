import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/Shared.module";
import {CommandsComponent} from "./Commands.component";
import {CustomCommandsComponent} from "./tabs/CustomCommands.component";
import {SystemCommandsComponent} from "./tabs/SystemCommands.component";
import {CommandAttributesComponent} from "./declarations/CommandAttributesComponent";

const ROUTES: Routes = [
  {
    path: "",
    component: CommandsComponent,
    data: {displayName: "Commands"}
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CommandsComponent,
    CustomCommandsComponent,
    SystemCommandsComponent,
    CommandAttributesComponent
  ]
})
export class CommandsModule {
}
