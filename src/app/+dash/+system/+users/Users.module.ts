import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./Users.component";
import {SharedModule} from "../../../shared/Shared.module";

const ROUTES: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "overview",
        loadChildren: "./+user-overview/UserOverview.module#UserOverviewModule",
        data: {breadCrumbName: "Overview"}
      },
      {
        path: "user-groups",
        loadChildren: "./+user-groups/UserGroups.module#UserGroupsModule",
        data: {breadCrumbName: "Groups"}
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
    UsersComponent
  ]
})
export class UsersModule {
}
