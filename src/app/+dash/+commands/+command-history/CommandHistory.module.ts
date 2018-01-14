import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CommandHistoryComponent} from "./CommandHistory.component";

const ROUTES: Routes = [
  {
    path: "",
    component: CommandHistoryComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [CommandHistoryComponent]
})
export class CommandHistoryModule {
}
