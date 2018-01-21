import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {IntegrationsComponent} from "./Integrations.component";
import {SpotifySettingsComponent} from "./declarations/SpotifySettings.component";
import {TwitterSettingsComponent} from "./declarations/TwitterSettings.component";
import {SteamSettingsComponent} from "./declarations/SteamSettings.component";

const ROUTES: Routes = [
  {
    path: "",
    component: IntegrationsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    IntegrationsComponent,
    SpotifySettingsComponent,
    TwitterSettingsComponent,
    SteamSettingsComponent
  ]
})
export class IntegrationsModule {
}
