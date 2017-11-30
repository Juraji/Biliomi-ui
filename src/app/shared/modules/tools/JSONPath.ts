/**
 * Extract value from object using JSONPath
 * Examples:
 * - $ => Root object
 * - $.Property => Property value
 * - $.List[*] => Same as $.List, the value of List
 * - $.List[0].Property => Property value of first element in List
 * - $.List[:2].Property => An array of Property values of the first two elements in List
 * - $.List[:-2].Property => An array of Property values of the last two elements in List
 * - $.List[1:3].Property => An array of Property values of the second and third elements in List
 * - $.List[*].Property => An array of Property values for each element in List
 *
 * Support:
 * - Root object ($): Yes
 * - Current object (@): No
 * - Child operator (. or []): Yes
 * - Wildcard (* or [*]): Yes
 * - Array slice operator ([start:end]): Yes
 * - Recursive descent (..): No
 * - Script expressions (() or ?()): No
 *
 */
export class JSONPath {

  /**
   * Execute JSONPath
   * @param {string} path JSONPath directive
   * @param rootObject The object to disect
   * @param suppressErrors Suppress errors like undefined values
   * @return {Object} The resulting value
   */
  public static execute(path: string, rootObject: any, suppressErrors: boolean = true): any {
    try {
      return JSONPath._execute(path, rootObject);
    } catch (e) {
      if (suppressErrors) {
        return null;
      } else {
        throw new Error("Error while executing JSONPath: \"" + path + "\", message: " + e.message);
      }
    }
  }

  private static _execute(path:string, rootObject: any): any {
    if (rootObject == null) {
      throw new Error("Can not apply JSONPath to undefined");
    }

    let pathArray: string[] = path.split(".");
    let key: string;
    let value: any = null;

    while ((key = pathArray.shift()) != null) {
      if (key == "$") {
        // Root object
        value = rootObject;
      } else if (key.endsWith("]")) {
        // [] operator
        let match = /^(.+)\[([0-9*:]+)]$/.exec(key);

        if (match == null) {
          throw new Error("Invalid [] operator.");
        }

        if (match[2] == "*") {
          // [*] wildcard
          value = value[match[1]];
        } else if (match[2].indexOf(":") > -1) {
          // [start:end] slice operator
          let startEnd = match[2].split(":");

          if (startEnd[0].length == 0 && startEnd[1].length == 0) {
            throw new Error("Invalid [start:end] operator.");
          }

          if (startEnd[0].length == 0) {
            startEnd[0] = "0";
          }

          value = value[match[1]].slice(startEnd[0], startEnd[1]);
        } else {
          // [0-9+] index operator
          value = value[match[1]][match[2]];
        }
      } else {
        if (Array.isArray(value)) {
          // Array property merge
          value = value.map((o: any) => o[key]);
        } else {
          // Simple property
          value = value[key];
        }
      }
    }

    return value;
  }
}
