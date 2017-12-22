import {Dictionary, ArrayMapper} from "./FunctionalInterface";

export class ArrayUtils {

  /**
   * Shuffle an array using the Fisher-Yates algorithm.
   * The array is treated as reference, keep in mind that the original array wil get sorted
   *
   * @param {Array} array
   * @returns {Array}
   */
  public static shuffle<T>(array: Array<T>): Array<T> {
    let count: number = array.length, rand: number, temp: any;

    while (count > 0) {
      rand = Math.random() * count-- | 0;
      temp = array[count];
      array[count] = array[rand];
      array[rand] = temp
    }

    return array;
  }

  /**
   * Extract properties from an array with objects.
   *
   * @param {Array} array
   * @param propertyName
   * @returns {Array}
   */
  public static pluck(array: Array<any>, propertyName: string): Array<any> {
    let i = 0, result: Array<any> = [];
    while (i < array.length) {
      if (array[i].hasOwnProperty(propertyName)) result.push(array[i][propertyName]);
      i++;
    }
    return result;
  }

  /**
   * Filter an array to result with a new arry with unique elements
   *
   * @param {Array} array
   * @returns {Array}
   */
  public static unique<T>(array: Array<T>): Array<T> {
    return array.filter((u: T, i: number, a: Array<T>) => a.indexOf(u) === i);
  }

  /**
   * Filter an array to result with a new arry with unique objects, mapped by mapper
   *
   * @param {Array} array
   * @param {ArrayMapper} mapper
   * @returns {Array}
   */
  public static uniqueObject<T>(array: Array<T>, mapper: ArrayMapper<T, any>): Array<T> {
    let unique: Dictionary = {};
    let distinct: Array<T> = [];

    array.forEach((u: T, i: number, p: Array<T>) => {
      let key = mapper(u, i, p);
      if (!unique[key]) {
        distinct.push(u);
        unique[key] = true;
      }
    });

    return distinct;
  }

  /**
   * Default string sorting function, for use with Array.sort()
   *
   * @param {string} a
   * @param {string} b
   * @returns {number}
   */
  public static strSort(a: string, b: string): number {
    return a.localeCompare(b);
  }

  /**
   * Natural sorting function, for use with Array.sort()
   * Uses PHP.js's strnatcmp algorithm
   *
   * @param {string} a
   * @param {string} b
   * @returns {number}
   */
  public static natSort(a: string, b: string): number {
    if (!a.length || !b.length) return a.length - b.length;

    let leadingZerosRE: RegExp = /^0+(?=\d)/,
      whitespaceRE: RegExp = /^\s/,
      digitRE: RegExp = /^\d/,
      i: number = 0,
      j: number = 0;

    a = a.replace(leadingZerosRE, "");
    b = b.replace(leadingZerosRE, "");

    while (i < a.length && j < b.length) {
      // skip consecutive whitespace
      while (whitespaceRE.test(a.charAt(i))) i++;
      while (whitespaceRE.test(b.charAt(j))) j++;

      let ac: string = a.charAt(i), bc: string = b.charAt(j),
        aIsDigit: boolean = digitRE.test(ac), bIsDigit: boolean = digitRE.test(bc);

      if (aIsDigit && bIsDigit) {
        let bias: number = 0, fractional: boolean = ac === "0" || bc === "0";

        do {
          if (!aIsDigit) return -1;
          else if (!bIsDigit) return 1;
          else if (ac < bc) {
            if (!bias) bias = -1;
            if (fractional) return -1;
          } else if (ac > bc) {
            if (!bias) bias = 1;
            if (fractional) return 1;
          }

          ac = a.charAt(++i);
          bc = b.charAt(++j);

          aIsDigit = digitRE.test(ac);
          bIsDigit = digitRE.test(bc);
        } while (aIsDigit || bIsDigit);

        if (!fractional && bias) return bias;

        continue;
      }

      if (!ac || !bc) continue;
      else if (ac < bc) return -1;
      else if (ac > bc) return 1;

      i++;
      j++;
    }

    let iBeforeStrEnd: boolean = i < a.length, jBeforeStrEnd: boolean = j < b.length;

    // Check which string ended first
    // return -1 if a, 1 if b, 0 otherwise
    return (iBeforeStrEnd ? 1 : (jBeforeStrEnd ? -1 : 0));
  }
}
