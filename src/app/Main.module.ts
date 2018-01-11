import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/Shared.module";
import {MainComponent} from "./Main.component";
import {AuthenticatedGuard} from "./shared/router-guards/Authenticated.guard";
import {DirtyFormGuard} from "./shared/modules/dirty-form-navigation-guard/router-guards/DirtyForm.guard";

export const LOGIN_ROUTE: string = "/login";
export const DASH_ROUTE: string = "/dash/home";
const ROOT_ROUTES: Routes = [
  // Root router config should have a default route for /
  {path: "", redirectTo: LOGIN_ROUTE, pathMatch: "full"},
  {
    path: "login",
    loadChildren: "./+login/Login.module#LoginModule"
  },
  {
    path: "dash",
    loadChildren: "./+dash/Dash.module#DashModule",
    canActivate: [AuthenticatedGuard, DirtyFormGuard],
    canActivateChild: [DirtyFormGuard],
    data: {breadCrumbName: "Dash"}
  },
  {
    path: "error",
    loadChildren: "./+error-pages/ErrorPages.module#ErrorPagesModule"
  },

  // Default route for unknown paths
  {
    path: "**",
    redirectTo: "/error/page-not-found",
    data: {breadCrumbName: "Not Found"}
  }
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROOT_ROUTES),
    SharedModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
