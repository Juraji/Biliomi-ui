import {SharedModule} from "../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "/dash/chat/chat-moderator",
    pathMatch: "full"
  },
  {
    path: "chat-moderator",
    loadChildren: "./+chat-moderator/ChatModerator.module#ChatModeratorModule",
    data: {breadCrumbName: "Chat Moderator"}
  },
  {
    path: "announcements",
    loadChildren: "./+announcements/Announcements.module#AnnouncementsModule",
    data: {breadCrumbName: "Announcements"}
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
