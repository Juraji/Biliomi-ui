import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {RaidsComponent} from "./Raids.component";

const ROUTES: Routes = [
  {
    path: "",
    component: RaidsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [RaidsComponent]
})
export class RaidsModule {
}
