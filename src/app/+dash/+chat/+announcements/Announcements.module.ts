import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AnnouncementsComponent} from "./Announcements.component";
import {EditAnnouncementModalComponent} from "./declarations/EditAnnouncementModal.component";

const ROUTES: Routes = [
  {
    path: "",
    component: AnnouncementsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AnnouncementsComponent,
    EditAnnouncementModalComponent
  ],
  entryComponents: [EditAnnouncementModalComponent]
})
export class AnnouncementsModule {
}
