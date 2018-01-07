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
        path: "users-settings",
        loadChildren: "./+users-settings/UsersSettings.module#UsersSettingsModule",
        data: {breadCrumbName: "Settings"}
      },
      {
        path: "hosts",
        loadChildren: "./+hosts/Hosts.module#HostsModule",
        data: {breadCrumbName: "Hosts"}
      },
      {
        path: "donations",
        loadChildren: "./+donations/Donations.module#DonationsModule",
        data: {breadCrumbName: "Donations"}
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
