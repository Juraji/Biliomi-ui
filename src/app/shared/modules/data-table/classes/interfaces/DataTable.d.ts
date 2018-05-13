import { Observable } from "rxjs";
import { Dictionary } from "../../../tools/FunctionalInterface";

interface CollectionViewer {
    viewChange: Observable<CollectionViewerUpdate>;
}

interface CollectionViewerUpdate {
    start: number;
    end: number;
}

interface CellOutletRowContext<T> {
    $implicit: T;
    index?: number;
    count?: number;
    first?: boolean;
    last?: boolean;
    even?: boolean;
    odd?: boolean;
}

type TableColumnsSetup = ColumnSetup[];

interface ColumnSetup {
    id: string;
    visible: boolean;
}

interface TableFilterNameMapping extends Dictionary {
}
