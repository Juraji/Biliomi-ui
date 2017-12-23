import {ModelRestClient} from "../../biliomi/classes/ModelRestClient";
import {SortBuilder} from "../../biliomi/classes/SortBuilder";
import {MatTableDataSource} from "@angular/material";
import {HttpParams} from "@angular/common/http";
import {ProgressBarMode} from "./interfaces/ProgressBarMode.interface";
import {FilterBuilder} from "../../biliomi/classes/FilterBuilder";

export class RestTableDataSource<T> extends MatTableDataSource<T> {
  private _restClient: ModelRestClient<T>;
  private _progressBarMode: ProgressBarMode = ProgressBarMode.NONE;
  private _isInitialized: boolean = false;
  private _sortBuilder: SortBuilder;
  private _filterBuilder: FilterBuilder;
  private _clientParams: HttpParams;


  constructor() {
    super([]);
  }

  public get client(): ModelRestClient<T> {
    return this._restClient;
  }

  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  public get hasData(): boolean {
    return this.data != null && this.data.length > 0;
  }

  public get sortBuilder(): SortBuilder {
    if (this._sortBuilder == null) {
      this._sortBuilder = new SortBuilder();
    }
    return this._sortBuilder;
  }

  public get filterBuilder(): FilterBuilder {
    if (this._filterBuilder == null) {
      this._filterBuilder = new FilterBuilder();
    }
    return this._filterBuilder;
  }

  public get progressBarMode(): ProgressBarMode {
    return this._progressBarMode;
  }

  public set clientParams(params: HttpParams) {
    this._clientParams = params;
  }

  public set client(client: ModelRestClient<T>) {
    this._restClient = client;
  }

  public async update() {
    this._progressBarMode = ProgressBarMode.INDETERMINATE;
    this.data = await this._restClient.getList(this._sortBuilder, this._filterBuilder, this._clientParams) || [];
    this._progressBarMode = ProgressBarMode.NONE;
    this._isInitialized = true;
  }
}
