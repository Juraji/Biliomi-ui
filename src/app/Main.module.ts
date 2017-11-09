import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/Shared.module";
import {MainComponent} from "./declarations/Main.component";

const ROOT_ROUTES: Routes = [
  // Root router config should have a default route for /
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {
    path: "login",
    loadChildren: './+login/Login.module#LoginModule',
    data: {displayName: "Login"}
  },
  {
    path: "dash",
    loadChildren: './+dash/Dash.module#DashModule',
    data: {displayName: "Dash"}
  },
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROOT_ROUTES),
    BrowserAnimationsModule,

    // Shared
    SharedModule.forRoot(),
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
