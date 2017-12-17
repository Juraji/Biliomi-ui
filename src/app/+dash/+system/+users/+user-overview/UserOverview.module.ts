import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UserOverviewComponent} from "./UserOverview.component";
import {EditUserModalComponent} from "./declarations/EditUserModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: UserOverviewComponent,
  },
  {
    path: ":username",
    component: UserOverviewComponent,
    data: {breadCrumbName: "Edit User"}
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    UserOverviewComponent,
    EditUserModalComponent,
  ],
  entryComponents: [EditUserModalComponent]
})
export class UserOverviewModule {
}
