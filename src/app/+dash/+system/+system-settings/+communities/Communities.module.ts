import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CommunitiesComponent} from "./Communities.component";

const ROUTES: Routes = [
  {
    path: "",
    component: CommunitiesComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [CommunitiesComponent]
})
export class CommunitiesModule {
}
