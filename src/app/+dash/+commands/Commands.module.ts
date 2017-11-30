import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/Shared.module";
import {CommandsComponent} from "./Commands.component";
import {CustomCommandsComponent} from "./tabs/CustomCommands.component";
import {SystemCommandsComponent} from "./tabs/SystemCommands.component";
import {CommandAttributesComponent} from "./declarations/CommandAttributes.component";
import {EditCustomCommandModalComponent} from "./declarations/EditCustomCommandModal.component";
import {EditDefaultCommandModalComponent} from "./declarations/EditDefaultCommandModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: CommandsComponent
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
    CommandAttributesComponent,
    EditCustomCommandModalComponent,
    EditDefaultCommandModalComponent
  ],
  entryComponents: [
    EditCustomCommandModalComponent,
    EditDefaultCommandModalComponent
  ]
})
export class CommandsModule {
}
