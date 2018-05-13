export class ListCache<T> {
    private _list: T[] = [];

    public hasData(): boolean {
        return this._list.length > 0;
    }

    public set(data: T[]) {
        if (data != null) {
            this._list = data;
        }
    }

    public append(item: T) {
        if (item != null) {
            this._list.push(item);
        }
    }

    public get(): T[] {
        return this._list.slice();
    }

    public getAt(index: number): T {
        if (index <= this._list.length) {
            return this._list[index];
        } else {
            return null;
        }
    }

    public clear() {
        this._list = [];
    }
}
