export class ObjectUtils {

  /**
   * Get the type of a specific object property
   * @param {T} obj
   * @param {K} propertyName
   * @returns {string}
   */
  public static typeOfProperty<T, K extends keyof T>(obj: T, propertyName: K): string {
    return typeof this.getProperty(obj, propertyName);
  }

  /**
   * Get the value of a specific object property
   * @param {T} obj
   * @param {K} propertyName
   * @returns {Object}
   */
  public static getProperty<T, K extends keyof T>(obj: T, propertyName: K): any {
    return obj[propertyName];
  }

  /**
   * Get all own property names of the given object
   * @param {T} obj
   * @returns {string[]}
   */
  public static getProperties<T, K extends keyof T>(obj: T): K[] {
    return (Object.keys(obj) as K[]).filter((k: K) => obj.hasOwnProperty(k));
  }
}
