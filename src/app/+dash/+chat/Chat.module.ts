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
    data: {crumbName: "Chat Moderator"}
  },
  {
    path: "announcements",
    loadChildren: "./+announcements/Announcements.module#AnnouncementsModule",
    data: {crumbName: "Announcements"}
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
