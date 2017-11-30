import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./Users.component";
import {SharedModule} from "../../../shared/Shared.module";

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
    UsersComponent
  ]
})
export class UsersModule {
}
