import {CdkHeaderCellDef} from "@angular/cdk/table";

export type TableColumnsSetup = ColumnSetup[];

export interface ColumnSetup {
  id: string;
  headerCellDef: CdkHeaderCellDef;
  visible: boolean;
}
