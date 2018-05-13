import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { GreetingsComponent } from "./Greetings.component";
import { EditGreetingComponent } from "./declarations/EditGreeting.component";

const ROUTES: Routes = [
    {
        path: "",
        component: GreetingsComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        GreetingsComponent,
        EditGreetingComponent
    ],
    entryComponents: [EditGreetingComponent]
})
export class GreetingsModule {
}
