import { EmbeddedViewRef } from "@angular/core";
import { CellOutletRowContext } from "../interfaces/DataTable";

export abstract class RowViewRef<T> extends EmbeddedViewRef<CellOutletRowContext<T>> {
}
