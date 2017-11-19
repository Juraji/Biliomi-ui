import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/Shared.module";
import {MainComponent} from "./declarations/Main.component";
import {PageNotFoundComponent} from "./declarations/PageNotFound.component";
import {AuthGuard} from "./shared/router-guards/Auth.guard";

export const LOGIN_ROUTE: string = "/login";
export const DASH_ROUTE: string = "/dash/home";
const ROOT_ROUTES: Routes = [
  // Root router config should have a default route for /
  {path: "", redirectTo: LOGIN_ROUTE, pathMatch: "full"},
  {
    path: "login",
    loadChildren: './+login/Login.module#LoginModule',
    data: {displayName: "Login"}
  },
  {
    path: "dash",
    loadChildren: './+dash/Dash.module#DashModule',
    canActivate: [AuthGuard],
    data: {displayName: "Dash"}
  },

  // Default route for unknown paths
  {
    path: "**",
    component: PageNotFoundComponent,
    data: {displayName: "Not Found"}
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

    // Shared
    SharedModule.forRoot(),
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
