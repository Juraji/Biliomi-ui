import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./declarations/PageNotFound.component";

const ROUTES: Routes = [
    {
        path: "",
        redirectTo: "/error/page-not-found"
    },
    {
        path: "page-not-found",
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        PageNotFoundComponent
    ]
})
export class ErrorPagesModule {
}
