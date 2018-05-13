import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BotSettingsComponent } from "./BotSettings.component";
import { ChatSettingsComponent } from "./declarations/ChatSettings.component";
import { TimeTrackingSettingsComponent } from "./declarations/TimeTrackingSettings.component";
import { PointsSettingsComponent } from "./declarations/PointsSettings.component";
import { SharedModule } from "../../../../shared/Shared.module";

const ROUTES: Routes = [
    {
        path: "",
        component: BotSettingsComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        BotSettingsComponent,
        ChatSettingsComponent,
        TimeTrackingSettingsComponent,
        PointsSettingsComponent
    ],
    entryComponents: []
})
export class BotSettingsModule {
}
