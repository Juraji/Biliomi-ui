import { NgModule } from "@angular/core";
import { ConfirmDialogComponent } from "./declarations/ConfirmDialog.component";
import { DialogsService } from "./services/Dialogs.service";
import * as material from "@angular/material";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        material.MatDialogModule,
        material.MatButtonModule
    ],
    declarations: [ConfirmDialogComponent],
    entryComponents: [ConfirmDialogComponent],
    providers: [DialogsService] // DialogsService should be registered to for all DI's
})
export class DialogsModule {
}
