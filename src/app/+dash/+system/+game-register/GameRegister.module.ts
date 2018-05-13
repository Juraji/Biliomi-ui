import { NgModule } from "@angular/core";
import { SharedModule } from "../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { GameRegisterComponent } from "./GameRegister.component";
import { EditGameModalComponent } from "./declarations/EditGameModal.component";

const ROUTES: Routes = [
    {
        path: "",
        component: GameRegisterComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        GameRegisterComponent,
        EditGameModalComponent
    ],
    entryComponents: [EditGameModalComponent]
})
export class GameRegisterModule {
}
