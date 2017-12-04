import {Pipe, PipeTransform} from "@angular/core";

export type CaseType = "TITLE_CASE" | "CAMEL_CASE" | "SNAKE_CASE" | "SCREAMING_SNAKE_CASE";
const CASE_CHANGE_SPLIT_REGEX: RegExp = /([a-zA-Z])(?=[A-Z][a-z])/g;
const CASE_CHANGE_SPLIT_REPLACEMENT: string = "$1 ";
const CASE_SNAKE_SPLIT_REGEX: RegExp = /_/g;
const CASE_SNAKE_SPLIT_REPLACEMENT: string = " ";

@Pipe({name: "caseToWord"})
export class CaseToWordPipe implements PipeTransform {
  public transform(value: string, caseType: CaseType, upperCaseFirst: boolean = true): string {
    if (caseType == null) {
      throw new Error("Missing case type parameter");
    }

    if (value == null) {
      return value;
    }

    switch (caseType) {
      case "TITLE_CASE":
        return CaseToWordPipe._splitTitleCase(value);
      case "CAMEL_CASE":
        return CaseToWordPipe._splitCamelCase(value, upperCaseFirst);
      case "SNAKE_CASE":
      case "SCREAMING_SNAKE_CASE":
        return CaseToWordPipe._splitSnakeCase(value, upperCaseFirst);
      default:
        throw new Error("Unknown case type")
    }
  }

  private static _splitTitleCase(value: string): string {
    return value.replace(CASE_CHANGE_SPLIT_REGEX, CASE_CHANGE_SPLIT_REPLACEMENT);
  }

  private static _splitCamelCase(value: string, upperCaseFirst: boolean): string {
    let result: string = value.replace(CASE_CHANGE_SPLIT_REGEX, CASE_CHANGE_SPLIT_REPLACEMENT);
    if (upperCaseFirst) {
      result = CaseToWordPipe._doUpperCaseFirst(value);
    }
    return result;
  }

  private static _splitSnakeCase(value: string, upperCaseFirst: boolean): string {
    let result: string = value.replace(CASE_SNAKE_SPLIT_REGEX, CASE_SNAKE_SPLIT_REPLACEMENT);
    if (upperCaseFirst) {
      result = CaseToWordPipe._doUpperCaseFirst(value);
    }
    return result;
  }

  private static _doUpperCaseFirst(result: string): string {
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }
}
