import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UserGroupsComponent} from "./UserGroups.component";
import {EditUserGroupModalComponent} from "./declarations/EditUserGroupModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: UserGroupsComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    UserGroupsComponent,
    EditUserGroupModalComponent
  ],
  entryComponents: [EditUserGroupModalComponent]
})
export class UserGroupsModule {
}
