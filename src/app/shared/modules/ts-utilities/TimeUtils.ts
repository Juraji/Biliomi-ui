import * as moment from "moment";
import {NumberUtils} from "./NumberUtils";
import {StringUtils} from "./StringUtils";


export class TimeUtils {
  public static MILLIS_IN_YEAR: number = 3.1709791983765e10;
  public static MILLIS_IN_DAY: number = 864e5;
  public static MILLIS_IN_HOUR: number = 36e5;
  public static MONTHS_IN_YOUR: number = 12;
  public static AVG_DAYS_IN_MONTH: number = 30.4166666666666;

  /**
   * Get a Moment object of now
   * Wrapped for testing
   *
   * @returns {moment.Moment}
   */
  public static getMoment() {
    return moment();
  }

  /**
   * Convert the given amount of milliseconds to an age.
   * Uses the large timescale.
   *
   * @param {number} millis
   * @returns {string}
   */
  public static millisToAge(millis: number): string {
    return this.millisToRelTimeStrYMD(this.getMoment().diff(moment(millis)));
  }

  /**
   * Convert the given amount of milliseconds into a human readable string.
   * Uses the small timescale.
   *
   * @param {number} millis
   * @param {boolean} hrsOnly
   * @param {boolean} minify
   * @returns {string}
   */
  public static millisToRelTimeStrHMS(millis: number, hrsOnly: boolean = false, minify: boolean = false): string {
    let cHrs = millis / this.MILLIS_IN_HOUR,
      cMins = cHrs % 1 * 60,
      cSecs = cMins % 1 * 60,
      hrs = ~~cHrs,
      mins = ~~cMins,
      secs = ~~cSecs,
      s: Array<string> = [];

    if (hrs > 0 || hrsOnly) s.push(hrs + " " + (NumberUtils.isPlural(hrs) ? "hours" : "hour"));
    if ((mins > 0 || hrs > 0) && !hrsOnly) s.push(mins + " " + (NumberUtils.isPlural(mins) ? "minutes" : "minute"));
    if (!hrsOnly) s.push(secs + " " + (NumberUtils.isPlural(secs) ? "seconds" : "second"));
    if (minify) return this.minifyRelTime(s.join(", "));
    return s.join(", ");
  }

  /**
   * Convert the given amount of milliseconds into a human readable string.
   * Uses the small timescale.
   *
   * @param {number} millis
   * @returns {string}
   */
  public static millisToDigiClockStr(millis: number): string {
    let cHrs = millis / this.MILLIS_IN_HOUR,
      cMins = cHrs % 1 * 60,
      cSecs = cMins % 1 * 60,
      hrs = ~~cHrs,
      mins = ~~cMins,
      secs = ~~cSecs,
      s: Array<string> = [];

    if (hrs > 0) {
      s.push(StringUtils.strPad(hrs));
    }
    s.push(StringUtils.strPad(mins));
    s.push(StringUtils.strPad(secs));

    return s.join(":");
  }

  /**
   * Convert the given amount of milliseconds to a human readable string.
   * Uses the large timescale
   *
   * @param {number} millis
   * @param {boolean} minify
   * @returns {string}
   */
  public static millisToRelTimeStrYMD(millis: number, minify: boolean = false): string {
    if (millis < this.MILLIS_IN_DAY) {
      let cHrs = millis / this.MILLIS_IN_HOUR;
      return ~~cHrs + " " + (NumberUtils.isPlural(~~cHrs) ? "hours" : "hour");
    }

    let dt = moment.duration(millis),
      yrs = dt.years(),
      mts = dt.months(),
      days = dt.days(),
      s: Array<string> = [];

    if (yrs > 0) s.push(yrs + " " + (NumberUtils.isPlural(yrs) ? "years" : "year"));
    if (mts > 0 || yrs > 0) s.push(mts + " " + (NumberUtils.isPlural(mts) ? "months" : "month"));
    s.push(days + " " + (NumberUtils.isPlural(days) ? "days" : "day"));

    if (minify) return this.minifyRelTime(s.join(", "));
    return s.join(", ");
  }

  /**
   * Converts the given amount of milliseconds to a locale based date and time string.
   *
   * @param {number} millis
   * @returns {string}
   */
  public static millisToISODateStr(millis: number): string {
    let date: Date = new Date(millis);
    return date.toDateString() + " " + date.toTimeString();
  }

  /**
   * Minify the output from the Relative Time functions.
   * E.g. "30 minutes, 0 seconds" becomes "30 minutes"
   *
   * @param relTimeOutput
   */
  public static minifyRelTime(relTimeOutput: string): string {
    return relTimeOutput
      .replace(/,[^\d][0]+\s[a-z]+/ig, "")  // Trailing 0 defs
      .replace(/[^\d][0]+\s[a-z]+,\s/, ""); // leading 0 defs
  }
}
