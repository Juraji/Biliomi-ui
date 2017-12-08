import {SharedModule} from "../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "/dash/chat/followers",
    pathMatch: "full"
  },
  {
    path: "followers",
    loadChildren: './+followers/Followers.module#FollowersModule',
    data: {displayName: "Followers"}
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
})
export class ChatModule {
}
