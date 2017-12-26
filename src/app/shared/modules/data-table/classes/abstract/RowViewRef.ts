import {EmbeddedViewRef} from "@angular/core";
import {CellOutletRowContext} from "../interfaces/CellOutletRowContext.interface";

export abstract class RowViewRef<T> extends EmbeddedViewRef<CellOutletRowContext<T>> {
}
