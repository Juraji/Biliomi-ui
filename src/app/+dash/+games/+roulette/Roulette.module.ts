import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {RouletteComponent} from "./Roulette.component";

const ROUTES: Routes = [
  {
    path: "",
    component: RouletteComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [RouletteComponent]
})
export class RouletteModule {
}
