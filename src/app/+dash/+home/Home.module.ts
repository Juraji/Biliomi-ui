import {NgModule} from "@angular/core";
import {HomeComponent} from "./Home.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/Shared.module";

const ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {displayName: "Home"}
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
