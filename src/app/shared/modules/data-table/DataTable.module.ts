import {NgModule} from "@angular/core";
import {DataTableComponent} from "./DataTable.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgMaterialModule} from "../ng-material/NgMaterial.module";
import {DataSourceProgressBarComponent} from "./components/DataSourceProgressBar.component";
import {ExtCdkTableComponent} from "./components/ExtCdkTable.component";
import {TableSetupModalComponent} from "./components/TableSetupModal.component";
import {TableButtonsDirective} from "./directives/TableButtons.directive";
import {SortHeaderDirective} from "./directives/SortHeader.directive";
import {ButtonsColumnDirective} from "./directives/ButtonsColumnDirective";
import {TableFilterQueryComponent} from "./components/TableFilterQuery.component";
import {TableFilterQueryHelpModalComponent} from "./components/TableFilterQueryHelpModal.component";

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
    TableSetupModalComponent,
    TableButtonsDirective,
    SortHeaderDirective,
    ButtonsColumnDirective,
    TableFilterQueryComponent,
    TableFilterQueryHelpModalComponent
  ],
  exports: [
    DataTableComponent,
    TableButtonsDirective,
    SortHeaderDirective,
    ButtonsColumnDirective,
    TableFilterQueryComponent,
  ],
  entryComponents: [
    TableSetupModalComponent,
    TableFilterQueryHelpModalComponent
  ]
})
export class DataTableModule {
}
