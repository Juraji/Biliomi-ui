import {MatTableDataSource} from "@angular/material";
import {ModelRestClient} from "../biliomi/classes/ModelRestClient";

export class RestMatDataSource<T> extends MatTableDataSource<T> {
  private _restClient: ModelRestClient<T>;

  constructor(initialData: T[] = []) {
    super(initialData);
  }

  public bindClient(client: ModelRestClient<T>) {
    this._restClient = client;
  }

  public async updateData(): Promise<void> {
    this.data = await this._restClient.getList();
  }
}
