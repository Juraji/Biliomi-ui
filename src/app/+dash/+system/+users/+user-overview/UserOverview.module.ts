import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UserOverviewComponent} from "./UserOverview.component";
import {EditUserModalModule} from "./edit-user-modal/EditUserModal.module";

const ROUTES: Routes = [
  {
    path: "",
    component: UserOverviewComponent
  },
  {
    path: ":username",
    component: UserOverviewComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    EditUserModalModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [UserOverviewComponent]
})
export class UserOverviewModule {
}
