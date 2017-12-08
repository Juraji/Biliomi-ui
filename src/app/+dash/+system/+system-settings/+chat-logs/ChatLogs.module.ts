import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../../shared/Shared.module";
import {ChatLogsComponent} from "./ChatLogs.component";

const ROUTES: Routes = [
  {
    path: "",
    component: ChatLogsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ChatLogsComponent
  ],
  entryComponents: []
})
export class ChatLogsModule {
}
