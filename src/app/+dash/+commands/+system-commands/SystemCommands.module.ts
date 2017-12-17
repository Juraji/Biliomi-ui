import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/Shared.module";
import {SystemCommandsComponent} from "./SystemCommands.component";
import {EditSystemCommandModalComponent} from "./declarations/EditSystemCommandModal.component";
import {SystemCommandAttributesComponent} from "./declarations/SystemCommandAttributes.component";

const ROUTES: Routes = [
  {
    path: "",
    component: SystemCommandsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    SystemCommandsComponent,
    SystemCommandAttributesComponent,
    EditSystemCommandModalComponent
  ],
  entryComponents: [
    EditSystemCommandModalComponent
  ]
})
export class SystemCommandsModule {
}
