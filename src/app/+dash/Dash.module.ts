import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {DashComponent} from "./Dash.component";

const ROUTES: Routes = [
  {
    path: "",
    component: DashComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class DashModule {
}
