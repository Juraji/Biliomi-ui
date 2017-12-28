import {Observable} from "rxjs/Observable";

export interface CollectionViewer {
  viewChange: Observable<{start: number, end: number}>;
}
