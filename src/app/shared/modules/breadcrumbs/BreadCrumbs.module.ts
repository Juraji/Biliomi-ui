import {ModuleWithProviders, NgModule} from "@angular/core";
import {BreadCrumbsComponent} from "./BreadCrumbs.component";
import {CrumbsService} from "./services/Crumbs.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule
  ],
  declarations: [BreadCrumbsComponent],
  exports: [BreadCrumbsComponent]
})
export class BreadCrumbsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BreadCrumbsModule,
      providers: [CrumbsService]
    };
  }
}
