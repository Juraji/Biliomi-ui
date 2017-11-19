export class ListCache<T> {
  private _list: T[] = [];

  public hasData(): boolean {
    return this._list.length > 0;
  }

  public set(data: T[] = null) {
    if (data != null) {
      this._list = data;
    }
  }

  public get(): T[] {
    return this._list;
  }
}
