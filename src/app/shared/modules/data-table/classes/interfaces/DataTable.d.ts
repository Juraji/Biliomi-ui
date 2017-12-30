import {Observable} from "rxjs/Observable";
import {Dictionary} from "../../../tools/FunctionalInterface";

interface CollectionViewer {
  viewChange: Observable<{ start: number, end: number }>;
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
