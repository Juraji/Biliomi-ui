import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/Shared.module";

const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "/dash/system/users",
    pathMatch: "full"
  },
  {
    path: "users",
    loadChildren: './+users/Users.module#UsersModule',
    data: {displayName: "Users"}
  },
  {
    path: "system-settings",
    loadChildren: './+system-settings/SystemSettings.module#SystemSettingsModule',
    data: {displayName: "System Settings"}
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [],
})
export class SystemModule {
}
