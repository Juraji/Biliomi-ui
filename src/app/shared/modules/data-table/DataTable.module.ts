import {NgModule} from "@angular/core";
import {DataTableComponent} from "./DataTable.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgMaterialModule} from "../ng-material/NgMaterial.module";
import {DataSourceProgressBarComponent} from "./components/DataSourceProgressBar.component";
import {ExtCdkTableComponent} from "./components/ExtCdkTable.component";
import {ExtCdkTablePlaceHolderDirective} from "./components/ExtCdkTablePlaceHolder.directive";
import {TableSetupModalComponent} from "./components/TableSetupModal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
  ],
  declarations: [
    DataTableComponent,
    ExtCdkTableComponent,
    DataSourceProgressBarComponent,
    ExtCdkTablePlaceHolderDirective,
    TableSetupModalComponent
  ],
  exports: [DataTableComponent],
  entryComponents: [TableSetupModalComponent]
})
export class DataTableModule {
}