import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { UserOverviewComponent } from "./UserOverview.component";

const ROUTES: Routes = [
    {
        path: "",
        component: UserOverviewComponent
    },
    {
        path: ":username",
        component: UserOverviewComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [UserOverviewComponent]
})
export class UserOverviewModule {
}
