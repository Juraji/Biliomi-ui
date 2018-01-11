import {NgModule} from "@angular/core";
import {ConfirmDialogComponent} from "./declarations/ConfirmDialog.component";
import {ConfirmDialogService} from "./services/ConfirmDialog.service";
import * as material from "@angular/material";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    material.MatDialogModule,
    material.MatButtonModule
  ],
  declarations: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [ConfirmDialogService] // ConfirmDialogService should be registered to for all DI's
})
export class ConfirmDialogModule {
}
