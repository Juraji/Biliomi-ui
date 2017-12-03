import {Biliomi} from "./interfaces/Biliomi";
import IRestSortDirective = Biliomi.IRestSortDirective;

export class SortBuilder {
  private directives: IRestSortDirective[] = [];

  public add(property: string, descending?: boolean, caseInsensitive?: boolean): SortBuilder {
    this.remove(property);
    this.directives.push({Property: property, Descending: descending, CaseInsensitive: caseInsensitive});
    return this;
  }

  public remove(property: string) {
    let index: number = this.directives.findIndex((d:IRestSortDirective) => d.Property == property);
    if (index > -1) {
      this.directives.splice(index, 1);
    }
  }

  public clear() {
    this.directives = [];
  }

  public toString() {
    return JSON.stringify(this.directives);
  }
}
