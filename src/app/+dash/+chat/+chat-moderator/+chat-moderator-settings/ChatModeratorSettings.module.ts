import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ChatModeratorSettingsComponent} from "./ChatModeratorSettings.component";
import {StrikeSelectComponent} from "./declarations/StrikeSelect.component";
import {CapsAndRepeatedCharactersSettingsComponent} from "./declarations/CapsAndRepeatedCharactersSettings.component";
import {LinkModerationSettingsComponent} from "./declarations/LinkModerationSettings.component";
import {StrikesAndExcemptionSettingsComponent} from "./declarations/StrikesAndExcemptionSettings.component";

const ROUTES: Routes = [
  {
    path: "",
    component: ChatModeratorSettingsComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ChatModeratorSettingsComponent,
    CapsAndRepeatedCharactersSettingsComponent,
    LinkModerationSettingsComponent,
    StrikesAndExcemptionSettingsComponent,
    StrikeSelectComponent,
  ]
})
export class ChatModeratorSettingsModule {
}
