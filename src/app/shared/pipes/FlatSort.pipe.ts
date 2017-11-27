import {Pipe, PipeTransform} from "@angular/core";
import {StringUtils} from "../modules/ts-utilities/StringUtils";

@Pipe({name: "flatSort"})
export class FlatSortPipe implements PipeTransform {
  public transform(objects: any[], property: string, descending?: boolean): any[] {
    if (objects == null || objects.length == 0) {
      return objects;
    }

    if (StringUtils.isEmpty(property)) {
      throw new Error("flatSort can not sort on an empty property");
    }

    let typeTestValue = objects[0][property];
    if (typeof typeTestValue === "string") {
      return objects.sort((a: any, b: any) =>
        (descending ? b[property].localeCompare(a[property]) : a[property].localeCompare(b[property])))
    } else if (!isNaN(typeTestValue)) {
      return objects.sort((a: any, b: any) =>
        (descending ? b[property] - a[property] : a[property] - b[property]));
    } else {
      throw new Error("flatSort can only sort by properties of type string or number");
    }
  }
}
