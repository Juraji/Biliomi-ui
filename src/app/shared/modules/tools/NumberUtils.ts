export class NumberUtils {
  private static FILE_SIZE_UNITS = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  private static FILE_SIZE_UNITS_SI = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  /**
   * Calculate the simplified fraction of two numbers.
   *
   * @param {number} numerator
   * @param {number} denominator
   * @returns {string}
   */
  public static asFraction(numerator: number, denominator: number): string {
    if (numerator <= 0) return "0/" + denominator;
    if (denominator <= 0) return numerator + "/0";

    let gcd = this.greatestCommonDenominator(numerator, denominator);
    return (numerator / gcd) + "/" + (denominator / gcd);
  }

  /**
   * Calculate the Greatest Common Denominator.
   * Uses the same Greatest Common Denominator magic as Biliomi.
   * E.g. (15, 3) becomes 3, (25, 5) becomes 5 or (16, 12) becomes 4.
   *
   * @param {number} numerator
   * @param {number} denominator
   * @returns {number}
   */
  public static greatestCommonDenominator(numerator: number, denominator: number): number {
    return denominator === 0 ? numerator : this.greatestCommonDenominator(denominator, numerator % denominator);
  }

  /**
   * Determine wether n is i18n plural or not
   *
   * @param {number} n
   * @returns {boolean}
   */
  public static isPlural(n: number) {
    return (n === 0 || n > 1 || n < -1);
  }

  /**
   * Calculate the percentage of current against total
   *
   * @param {number} current The current out of total
   * @param {number} total The total
   * @param {boolean} ceil Round the result up when true
   * @returns {number} A (fractional) number from 0 to 100
   */
  public static percentage(current: number, total: number, ceil: boolean = false): number {
    if (ceil) return Math.ceil((current * 100) / total);
    return (current * 100) / total;
  }

  /**
   * Convert an amount of bytes to a human readable number (e.g. "4 mb")
   *
   * @param {number} bytes The amount of bytes
   * @param {boolean} useSI Return the SI size (E.g. 3.0 MB, instead of 2.9 MiB)
   * @returns {string} The human readable string
   */
  public static formatBytes(bytes: number, useSI: boolean = false): string {
    let thresh: number = (useSI ? 1000 : 1024);

    if (Math.abs(bytes) < thresh) return bytes + " B";

    let units: Array<string> = (useSI ? this.FILE_SIZE_UNITS_SI : this.FILE_SIZE_UNITS);
    let u: number = -1;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);

    return bytes.toFixed(2) + " " + units[u];
  }
}
