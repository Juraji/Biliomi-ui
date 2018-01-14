import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";
import {EditUserComponent} from "./EditUser.component";
import {UserBaseInformationComponent} from "./declarations/UserBaseInformation.component";
import {UserHostRecordsComponent} from "./declarations/UserHostRecords.component";
import {UserAchievementsComponent} from "./declarations/UserAchievements.component";
import {UserAdventuresComponent} from "./declarations/UserAdventures.component";
import {UserDonationsComponent} from "./declarations/UserDonations.component";
import {UserInvestmentsComponent} from "./declarations/UserInvestments.component";

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
        path: "investments",
        component: UserInvestmentsComponent,
        data: {crumbName: "Investments"}
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
    UserInvestmentsComponent
  ]
})
export class EditUserModule {
}
