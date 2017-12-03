import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./Users.component";
import {SharedModule} from "../../../shared/Shared.module";
import {EditUserModalComponent} from "./declarations/EditUserModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: UsersComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    UsersComponent,
    EditUserModalComponent
  ],
  entryComponents: [EditUserModalComponent]
})
export class UsersModule {
}
