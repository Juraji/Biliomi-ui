import {NgModule} from "@angular/core";
import {ConfirmDialogComponent} from "./declarations/ConfirmDialog.component";
import {ConfirmDialogService} from "./services/ConfirmDialog.service";
import * as material from "@angular/material";

@NgModule({
  imports: [
    material.MatDialogModule,
    material.MatButtonModule
  ],
  declarations: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
  entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {
}
