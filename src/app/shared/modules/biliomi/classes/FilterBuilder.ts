import {Biliomi} from "./interfaces/Biliomi";
import IRestFilterDirective = Biliomi.IRestFilterDirective;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

export class FilterBuilder {
  private directives: IRestFilterDirective[] = [];

  public add(property: string, operator: IRestFilterOperator, value: any, negative?: boolean, orPrevious?: boolean): FilterBuilder {
    this.remove(property);

    this.directives.push({
      Property: property,
      Operator: operator,
      Value: value,
      Negative: negative,
      OrPrevious: orPrevious
    });

    return this;
  }

  public addDirective(directive: IRestFilterDirective, keepExisting?: boolean): FilterBuilder {
    if (!keepExisting) {
      this.remove(directive.Property);
    }
    this.directives.push(directive);
    return this;
  }

  public remove(property: string): FilterBuilder {
    let index: number;
    while ((index = this.directives.findIndex((d: IRestFilterDirective) => d.Property == property)) > -1) {
      this.directives.splice(index, 1);
    }
    return this;
  }

  public clear() {
    this.directives = [];
  }

  public toString() {
    if (this.directives.length == 0) {
      return null;
    }
    return JSON.stringify(this.directives);
  }
}
