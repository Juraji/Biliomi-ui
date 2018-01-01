import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AdventuresComponent} from "./Adventures.component";

const ROUTES: Routes = [
  {
    path: "",
    component: AdventuresComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [AdventuresComponent]
})
export class AdventuresModule {
}
