import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {TamagotchisComponent} from "./Tamagotchis.component";
import {TamagotchiSettingsComponent} from "./declarations/TamagotchiSettings.component";

const ROUTES: Routes = [
  {
    path: "",
    component: TamagotchisComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    TamagotchisComponent,
    TamagotchiSettingsComponent
  ]
})
export class TamagotchisModule {
}
