import { NgModule } from "@angular/core";
import { SharedModule } from "../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AchievementsComponent } from "./Achievements.component";

const ROUTES: Routes = [
    {
        path: "",
        component: AchievementsComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [AchievementsComponent]
})
export class AchievementsModule {
}
