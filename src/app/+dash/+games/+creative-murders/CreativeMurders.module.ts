import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CreativeMurdersComponent} from "./CreativeMurders.component";

const ROUTES: Routes = [
  {
    path: "",
    component: CreativeMurdersComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [CreativeMurdersComponent]
})
export class CreativeMurdersModule {
}
