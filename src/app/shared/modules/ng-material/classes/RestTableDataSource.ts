import {ModelRestClient} from "../../biliomi/classes/ModelRestClient";
import {SortBuilder} from "../../biliomi/classes/SortBuilder";
import {TableDataSource} from "./TableDataSource";

export class RestTableDataSource<T> extends TableDataSource<T> {
  private _restClient: ModelRestClient<T>;
  private _sortBuilder: SortBuilder;

  constructor(initialData: T[] = []) {
    super(() => this._restClient.getList(this._sortBuilder), initialData);
  }

  public get sortBuilder(): SortBuilder {
    if (this._sortBuilder == null) {
      this._sortBuilder = new SortBuilder();
    }
    return this._sortBuilder;
  }

  public bindClient(client: ModelRestClient<T>) {
    this._restClient = client;
  }

  public get client(): ModelRestClient<T> {
    return this._restClient;
  }
}
