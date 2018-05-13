import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../shared/Shared.module";
import { QuickActionsComponent } from "./QuickActions.component";
import { AddQuickActionModalComponent } from "./declarations/AddQuickActionModal.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        QuickActionsComponent,
        AddQuickActionModalComponent
    ],
    exports: [QuickActionsComponent],
    entryComponents: [AddQuickActionModalComponent]
})
export class QuickActionsModule {
}
