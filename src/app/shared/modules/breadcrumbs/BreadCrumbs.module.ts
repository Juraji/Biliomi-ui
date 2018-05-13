import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatToolbarModule, MatTooltipModule } from "@angular/material";
import { BreadCrumbsComponent } from "./BreadCrumbs.component";
import { CrumbsService } from "./services/Crumbs.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatTooltipModule
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
