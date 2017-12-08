import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/Shared.module";
import {FollowersComponent} from "./Followers.component";

const ROUTES: Routes = [
  {
    path: "",
    component: FollowersComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    FollowersComponent
  ],
  entryComponents: []
})
export class FollowersModule {
}
