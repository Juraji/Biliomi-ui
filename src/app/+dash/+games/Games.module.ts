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
    path: "creative-murders",
    loadChildren: "./+creative-murders/CreativeMurders.module#CreativeMurdersModule",
    data: {crumbName: "Creative Murders"}
  },
  {
    path: "investments",
    loadChildren: "./+investments/Investments.module#InvestmentsModule",
    data: {crumbName: "Investments"}
  },
  {
    path: "roulette",
    loadChildren: "./+roulette/Roulette.module#RouletteModule",
    data: {crumbName: "Roulette"}
  },
  {
    path: "tamagotchis",
    loadChildren: "./+tamagotchis/Tamagotchis.module#TamagotchisModule",
    data: {crumbName: "Tamagotchis"}
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
