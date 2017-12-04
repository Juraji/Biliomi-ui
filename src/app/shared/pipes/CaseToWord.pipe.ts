import {Pipe, PipeTransform} from "@angular/core";

export type CaseType = "TITLE_CASE" | "CAMEL_CASE" | "SNAKE_CASE" | "SCREAMING_SNAKE_CASE";

@Pipe({name: "caseToWord"})
export class CaseToWordPipe implements PipeTransform {
  public transform(value: string, caseType: CaseType, upperCaseFirst: boolean = true): string {
    if (caseType == null) {
      throw new Error("Missing case type parameter");
    }

    if (value == null && value.length > 1) {
      return value;
    }

    switch (caseType) {
      case "TITLE_CASE":
      case "CAMEL_CASE":
        return CaseToWordPipe._doTransform(value, upperCaseFirst, /([a-zA-Z])(?=[A-Z][a-z])/g, "$1 ");
      case "SNAKE_CASE":
      case "SCREAMING_SNAKE_CASE":
        return CaseToWordPipe._doTransform(value, upperCaseFirst, /_/g, " ");
      default:
        throw new Error("Unknown case type")
    }
  }

  private static _doTransform(value: string, upperCaseFirst: boolean, regex:RegExp, replacement: string): string {
    let result: string = value.replace(regex, replacement);
    if (upperCaseFirst) {
      result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
    }
    return result;
  }
}