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
    loadChildren: "./+followers/Followers.module#FollowersModule",
    data: {breadCrumbName: "Followers"}
  },
  {
    path: "subscribers",
    loadChildren: "./+subscribers/Subscribers.module#SubscribersModule",
    data: {breadCrumbName: "Subscribers"}
  },
  {
    path: "hosts",
    loadChildren: "./+hosts/Hosts.module#HostsModule",
    data: {breadCrumbName: "Hosts"}
  },
  {
    path: "chat-moderator",
    loadChildren: "./+chat-moderator/ChatModerator.module#ChatModeratorModule",
    data: {breadCrumbName: "Chat Moderator"}
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ChatModule {
}
