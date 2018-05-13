import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { EditUserComponent } from "./EditUser.component";
import { UserBaseInformationComponent } from "./declarations/UserBaseInformation.component";
import { UserHostRecordsComponent } from "./declarations/UserHostRecords.component";
import { UserAchievementsComponent } from "./declarations/UserAchievements.component";
import { UserAdventuresComponent } from "./declarations/UserAdventures.component";
import { UserDonationsComponent } from "./declarations/UserDonations.component";
import { UserInvestmentsComponent } from "./declarations/UserInvestments.component";
import { UserCreativeMurdersComponent } from "./declarations/UserCreativeMurders.component";
import { UserQuotesComponent } from "./declarations/UserQuotes.component";
import { UserRaidsComponent } from "./declarations/UserRaids.component";
import { UserRouletteRecordsComponent } from "./declarations/UserRouletteRecords.component";

const ROUTES: Routes = [
    {
        path: "",
        redirectTo: "/dash/system/users/overview",
        pathMatch: "full"
    },
    {
        path: ":username",
        component: EditUserComponent,
        data: {crumbName: ":username"},
        children: [
            {
                path: "hosts",
                component: UserHostRecordsComponent,
                data: {crumbName: "Hosts"}
            },
            {
                path: "raids",
                component: UserRaidsComponent,
                data: {crumbName: "Raids"}
            },
            {
                path: "donations",
                component: UserDonationsComponent,
                data: {crumbName: "Donations"}
            },
            {
                path: "achievements",
                component: UserAchievementsComponent,
                data: {crumbName: "Achievements"}
            },
            {
                path: "adventures",
                component: UserAdventuresComponent,
                data: {crumbName: "Adventures"}
            },
            {
                path: "creative-murders",
                component: UserCreativeMurdersComponent,
                data: {crumbName: "Creative Murders"}
            },
            {
                path: "investments",
                component: UserInvestmentsComponent,
                data: {crumbName: "Investments"}
            },
            {
                path: "roulette",
                component: UserRouletteRecordsComponent,
                data: {crumbName: "Roulette"}
            },
            {
                path: "quotes",
                component: UserQuotesComponent,
                data: {crumbName: "Quotes"}
            }
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        EditUserComponent,
        UserBaseInformationComponent,
        UserHostRecordsComponent,
        UserDonationsComponent,
        UserAchievementsComponent,
        UserAdventuresComponent,
        UserCreativeMurdersComponent,
        UserInvestmentsComponent,
        UserQuotesComponent,
        UserRaidsComponent,
        UserRouletteRecordsComponent
    ]
})
export class EditUserModule {
}
