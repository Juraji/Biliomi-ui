import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ChatModeratorRecordsComponent} from "./ChatModeratorRecords.component";

const ROUTES: Routes = [
  {
    path: "",
    component: ChatModeratorRecordsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [ChatModeratorRecordsComponent]
})
export class ChatModeratorRecordsModule {
}
