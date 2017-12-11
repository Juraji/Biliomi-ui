import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/Shared.module";
import {SubscribersComponent} from "./Subscribers.component";

const ROUTES: Routes = [
  {
    path: "",
    component: SubscribersComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    SubscribersComponent
  ],
  entryComponents: []
})
export class SubscribersModule {
}
