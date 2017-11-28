import {MatTableDataSource} from "@angular/material";
import {ModelRestClient} from "../../biliomi/classes/ModelRestClient";
import {SortBuilder} from "../../biliomi/classes/SortBuilder";

export class RestMatDataSource<T> extends MatTableDataSource<T> {
  private _restClient: ModelRestClient<T>;
  private _isInitialized: boolean = false;

  constructor(initialData: T[] = []) {
    super(initialData);
  }

  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  public get hasData(): boolean {
    return this.data != null && this.data.length > 0;
  }

  public bindClient(client: ModelRestClient<T>) {
    this._restClient = client;
  }

  public async updateData(sortBuilder?: SortBuilder): Promise<void> {
    let data: T[] = await this._restClient.getList(sortBuilder);
    if (data != null) {
      this.data = data;
      this._isInitialized = true;
    }
  }
}
