import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/Shared.module";
import {MainComponent} from "./declarations/Main.component";
import {PageNotFoundComponent} from "./declarations/PageNotFound.component";
import {AuthenticatedGuard} from "./shared/router-guards/Authenticated.guard";

export const LOGIN_ROUTE: string = "/login";
export const DASH_ROUTE: string = "/dash/home";
const ROOT_ROUTES: Routes = [
  // Root router config should have a default route for /
  {path: "", redirectTo: LOGIN_ROUTE, pathMatch: "full"},
  {
    path: "login",
    loadChildren: './+login/Login.module#LoginModule'
  },
  {
    path: "dash",
    loadChildren: './+dash/Dash.module#DashModule',
    canActivate: [AuthenticatedGuard],
    data: {breadCrumbName: "Dash"},
  },

  // Default route for unknown paths
  {
    path: "**",
    component: PageNotFoundComponent,
    data: {breadCrumbName: "Not Found"}
  }
];

@NgModule({
  declarations: [
    MainComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROOT_ROUTES),
    BrowserAnimationsModule,
    SharedModule,
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
