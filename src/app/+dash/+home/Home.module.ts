import {NgModule} from "@angular/core";
import {HomeComponent} from "./Home.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/Shared.module";
import {ClockCardComponent} from "./declarations/ClockCard.component";
import {SvgTransformPipe} from "./declarations/SvgTransform.pipe";
import {ChatterListComponent} from "./declarations/ChatterList.component";
import {HosterListComponent} from "./declarations/HosterList.component";
import {ChannelEditComponent} from "./declarations/ChannelEdit.component";
import {ChannelInfoComponent} from "./declarations/ChannelInfo.component";
import {QuickActionsModule} from "./declarations/quick-actions/QuickActions.module";

const ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    QuickActionsModule
  ],
  declarations: [
    HomeComponent,
    ClockCardComponent,
    ChatterListComponent,
    HosterListComponent,
    ChannelInfoComponent,
    ChannelEditComponent,

    SvgTransformPipe
  ]
})
export class HomeModule {
}
