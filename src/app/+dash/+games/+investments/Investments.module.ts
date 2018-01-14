import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {InvestmentsComponent} from "./Investments.component";

const ROUTES: Routes = [
  {
    path: "",
    component: InvestmentsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [InvestmentsComponent]
})
export class InvestmentsModule {
}
