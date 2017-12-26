import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgMaterialModule} from "../ng-material/NgMaterial.module";
import {CellOutletDirective} from "./directives/CellOutlet.directive";
import {HeaderRowComponent} from "./components/HeaderRow.component";
import {DataSourceProgressBarComponent} from "./components/DataSourceProgressBar.component";
import {HeaderCellDirective} from "./directives/HeaderCell.directive";
import {DataRowDefDirective} from "./directives/DataRowDef.directive";
import {HeaderCellDefDirective} from "./directives/HeaderCellDef.directive";
import {DataTableComponent} from "./DataTable.component";
import {ColumnDefDirective} from "./directives/ColumnDef.directive";
import {TableSetupModalComponent} from "./components/TableSetupModal.component";
import {SortPropertyDirective} from "./directives/SortProperty.directive";
import {DataRowComponent} from "./components/DataRow.component";
import {DataCellDirective} from "./directives/DataCell.directive";
import {HeaderRowDefDirective} from "./directives/HeaderRowDef.directive";
import {TableActionsRowComponent} from "./components/TableActionsRow.component";
import {TableFilterQueryComponent} from "./components/TableFilterQuery.component";
import {DataCellDefDirective} from "./directives/DataCellDef.directive";
import {CustomTableActionsDirective} from "./directives/CustomTableActions.directive";
import {DataSourcePaginatorComponent} from "./components/DataSourcePaginator.component";

const EXPORTED_DECLARATIONS = [
  DataTableComponent,
  HeaderRowComponent,
  DataRowComponent,
  TableActionsRowComponent,
  TableFilterQueryComponent,
  TableSetupModalComponent,
  DataSourceProgressBarComponent,
  DataSourcePaginatorComponent,

  DataCellDirective,
  DataCellDefDirective,
  CellOutletDirective,
  ColumnDefDirective,
  CustomTableActionsDirective,
  DataRowDefDirective,
  HeaderCellDirective,
  HeaderCellDefDirective,
  HeaderRowDefDirective,
  SortPropertyDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule
  ],
  declarations: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS
})
export class DataTableModule {
}
