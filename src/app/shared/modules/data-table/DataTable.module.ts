import { NgModule, Type } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import * as material from "@angular/material";
import { CellOutletDirective } from "./directives/CellOutlet.directive";
import { HeaderRowComponent } from "./components/HeaderRow.component";
import { DataSourceProgressBarComponent } from "./components/DataSourceProgressBar.component";
import { HeaderCellDirective } from "./directives/HeaderCell.directive";
import { DataRowDefDirective } from "./directives/DataRowDef.directive";
import { HeaderCellDefDirective } from "./directives/HeaderCellDef.directive";
import { DataTableComponent } from "./DataTable.component";
import { ColumnDefDirective } from "./directives/ColumnDef.directive";
import { TableSetupModalComponent } from "./components/TableSetupModal.component";
import { SortPropertyDirective } from "./directives/SortProperty.directive";
import { DataRowComponent } from "./components/DataRow.component";
import { DataCellDirective } from "./directives/DataCell.directive";
import { HeaderRowDefDirective } from "./directives/HeaderRowDef.directive";
import { TableActionsRowComponent } from "./components/TableActionsRow.component";
import { TableFilterQueryComponent } from "./components/TableFilterQuery.component";
import { DataCellDefDirective } from "./directives/DataCellDef.directive";
import { CustomTableActionsDirective } from "./directives/CustomTableActions.directive";
import { DataSourcePaginatorComponent } from "./components/DataSourcePaginator.component";

const IMPORTS: Type<any>[] = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    material.MatButtonModule,
    material.MatDialogModule,
    material.MatFormFieldModule,
    material.MatIconModule,
    material.MatInputModule,
    material.MatMenuModule,
    material.MatProgressBarModule,
    material.MatSelectModule,
    material.MatSlideToggleModule,
    material.MatTooltipModule
];

const DECLARATIONS: Type<any>[] = [
    HeaderRowComponent,
    DataRowComponent,
    TableActionsRowComponent,
    TableFilterQueryComponent,
    TableSetupModalComponent,
    DataSourceProgressBarComponent,
    DataSourcePaginatorComponent,

    CellOutletDirective
];

const EXPORTED_DECLARATIONS: Type<any>[] = [
    DataTableComponent,

    DataCellDirective,
    DataCellDefDirective,
    ColumnDefDirective,
    CustomTableActionsDirective,
    DataRowDefDirective,
    HeaderCellDirective,
    HeaderCellDefDirective,
    HeaderRowDefDirective,
    SortPropertyDirective
];

@NgModule({
    imports: IMPORTS,
    declarations: DECLARATIONS.concat(EXPORTED_DECLARATIONS),
    exports: EXPORTED_DECLARATIONS,
    entryComponents: [TableSetupModalComponent]
})
export class DataTableModule {
}
