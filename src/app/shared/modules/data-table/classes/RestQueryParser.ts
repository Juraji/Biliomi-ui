import {Biliomi} from "../../biliomi/classes/interfaces/Biliomi";
import {StringUtils} from "../../tools/StringUtils";
import IRestFilterDirective = Biliomi.IRestFilterDirective;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

const PREDICATE_DELIMITER_PATTERN: RegExp = /\s+(and|or)\s+/i;
const PREDICATE_AND_OR_PATTERN: RegExp = /^and|or$/i;
const PREDICATE_PATTERN: RegExp = /^([a-z. ]+)\s+([!]?[=~<>])\s+(.*)$/i;
const QUOTE_STRING_PATTERN: RegExp = /^"(.*)"$/i;
const NOT_MODIFIER: string = "!";
const OPERATORS_EQUALS: string = "=";
const OPERATORS_CONTAINS: string = "~";
const OPERATORS_LESSER_THAN: string = "<";
const OPERATORS_GREATER_THAN: string = ">";

export class RestQueryParser {
  private _restFilters: IRestFilterDirective[] = [];

  constructor(queryInput: string) {
    queryInput = queryInput || "";
    let predicates: string[] = queryInput.split(PREDICATE_DELIMITER_PATTERN);

    if (predicates.length > 0) {
      this._parsePredicates(predicates);
    }
  }

  public get isValid(): boolean {
    return this._restFilters.length > 0;
  }

  public get restFilters(): IRestFilterDirective[] {
    return this._restFilters;
  }

  private _parsePredicates(predicates: string[]) {
    for (let i = 0; i < predicates.length; i++) {
      let filter = {OrPrevious: false} as IRestFilterDirective;
      let predicate = predicates[i];

      if (predicate.match(PREDICATE_AND_OR_PATTERN)) {
        filter.OrPrevious = ("or" == predicate);
        predicate = predicates[++i];
      }

      let result: RegExpMatchArray = predicate.match(PREDICATE_PATTERN);
      if (result == null) {
        this._restFilters = [];
        break;
      }

      filter.Property = result[1].trim();
      filter.Operator = RestQueryParser.convertOperator(result[2]);
      filter.Value = RestQueryParser.getRealValue(result[3]);
      filter.Negative = result[2].substr(0, 1) == NOT_MODIFIER;
      this._restFilters.push(filter);
    }
  }

  private static convertOperator(operator: string): IRestFilterOperator {
    if (operator.substr(0, 1) == NOT_MODIFIER) {
      operator = operator.substr(1, 1);
    }

    switch (operator) {
      case OPERATORS_EQUALS:
        return IRestFilterOperator.EQUALS;
      case OPERATORS_CONTAINS:
        return IRestFilterOperator.CONTAINS;
      case OPERATORS_LESSER_THAN:
        return IRestFilterOperator.LESSER_THAN;
      case OPERATORS_GREATER_THAN:
        return IRestFilterOperator.GREATER_THAN;
      default:
        return null;
    }
  }

  private static getRealValue(value: string): any {
    // Nulls
    if (StringUtils.equalsIgnoreCase("null", value)) {
      return null;
    }

    // Booleans
    if (StringUtils.equalsIgnoreCase("true", value)) {
      return true;
    } else if (StringUtils.equalsIgnoreCase("false", value)) {
      return false;
    }

    // Remove quotes
    value = value.replace(QUOTE_STRING_PATTERN, "$1");

    // Numbers
    let floatValue = parseFloat(value);
    return (isNaN(floatValue) ? value : floatValue);
  }
}
