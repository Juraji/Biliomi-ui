import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./Login.component";

const ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
