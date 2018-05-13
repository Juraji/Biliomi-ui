import { NgModule } from "@angular/core";
import { SharedModule } from "../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { QuotesComponent } from "./Quotes.component";

const ROUTES: Routes = [
    {
        path: "",
        component: QuotesComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [QuotesComponent]
})
export class QuotesModule {
}
