import {ModelRestClient} from "../../biliomi/classes/ModelRestClient";
import {SortBuilder} from "../../biliomi/classes/SortBuilder";
import {ProgressBarMode} from "../../ng-material/classes/interfaces/ProgressBarMode.interface";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Biliomi} from "../../biliomi/classes/interfaces/Biliomi";
import IPaginatedResponse = Biliomi.IPaginatedResponse;

export class RestTableDataSource<T> {
  private _data: BehaviorSubject<T[]>;
  private _restClient: ModelRestClient<T>;
  private _progressBarMode: ProgressBarMode = ProgressBarMode.NONE;
  private _sortBuilder: SortBuilder;
  private _clientParams: Map<string, any>;
  private _totalRowsAvailable: number = 0;
  private _initialized: boolean = false;

  public get client(): ModelRestClient<T> {
    return this._restClient;
  }

  public set client(client: ModelRestClient<T>) {
    this._restClient = client;
  }

  public get isInitialized(): boolean {
    return this._initialized;
  }

  public get sortBuilder(): SortBuilder {
    if (this._sortBuilder == null) {
      this._sortBuilder = new SortBuilder();
    }
    return this._sortBuilder;
  }

  public get clientParams() {
    if (this._clientParams == null) {
      this._clientParams = new Map<string, any>();
    }
    return this._clientParams;
  }

  public get progressBarMode(): ProgressBarMode {
    return this._progressBarMode;
  }

  public get dataSubject(): BehaviorSubject<T[]> {
    return this._data;
  }

  public get currentData(): T[] {
    return this._data.getValue();
  }

  public get totalRowsAvailable(): number {
    return this._totalRowsAvailable;
  }

  constructor() {
    this._data = new BehaviorSubject<T[]>([]);
  }

  public async update(): Promise<boolean> {
    this._initialized = true;
    this._progressBarMode = ProgressBarMode.INDETERMINATE;

    let data: IPaginatedResponse<T> = await this._restClient.getList(this._sortBuilder, null, this._clientParams);
    if (data != null) {
      this._totalRowsAvailable = data.TotalAvailable;
      this._data.next(data.Entities);
    } else {
      this._totalRowsAvailable = 0;
      this._data.next([]);
    }

    this._progressBarMode = ProgressBarMode.NONE;
    return data != null;
  }
}
