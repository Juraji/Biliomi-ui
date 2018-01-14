import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/Shared.module";
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "/dash/games/achievements",
    pathMatch: "full"
  },
  {
    path: "achievements",
    loadChildren: "./+achievements/Achievements.module#AchievementsModule",
    data: {crumbName: "Achievements"}
  },
  {
    path: "adventures",
    loadChildren: "./+adventures/Adventures.module#AdventuresModule",
    data: {crumbName: "Adventures"}
  },
  {
    path: "investments",
    loadChildren: "./+investments/Investments.module#InvestmentsModule",
    data: {crumbName: "Investments"}
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class GamesModule {
}
