import { Biliomi } from "./interfaces/Biliomi";
import IRestSortDirective = Biliomi.IRestSortDirective;

export class SortBuilder {
    private directives: IRestSortDirective[] = [];

    public add(property: string, descending?: boolean): SortBuilder {
        this.remove(property);

        this.directives.push({
            Property: property,
            Descending: descending
        });

        return this;
    }

    public remove(property: string): SortBuilder {
        let index: number = this.indexOf(property);
        if (index > -1) {
            this.directives.splice(index, 1);
        }
        return this;
    }

    public clear() {
        this.directives = [];
    }

    public indexOf(property: string) {
        return this.directives.findIndex((d: IRestSortDirective) => d.Property === property);
    }

    public toString() {
        if (this.directives.length === 0) {
            return null;
        }
        return JSON.stringify(this.directives);
    }
}
