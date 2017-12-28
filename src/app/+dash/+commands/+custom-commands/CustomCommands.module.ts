import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CustomCommandsComponent} from "./CustomCommands.component";
import {SharedModule} from "../../../shared/Shared.module";
import {EditCustomCommandModalComponent} from "./declarations/EditCustomCommandModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: CustomCommandsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CustomCommandsComponent,
    EditCustomCommandModalComponent
  ],
  entryComponents: [
    EditCustomCommandModalComponent
  ]
})
export class CustomCommandsModule {
}
