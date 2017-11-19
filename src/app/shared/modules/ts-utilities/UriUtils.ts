import {StringUtils} from "./StringUtils";

export class UrlUtils {

  /**
   * Appends the key-value pairs from the params map as querystring items to the url.
   * Merges any existing querystring
   *
   * @param {string} url The url to process
   * @param {Map<string, string>} params The parameters to use as querystring
   * @returns {string} The processed url
   */
  public static appendQueryString(url: string, params: Map<string, string>): string {
    let urlAndQS = url.split("?");
    let currentQueryString = urlAndQS[1];
    url = urlAndQS[0];

    if (StringUtils.isNotEmpty(currentQueryString)) {
      let kvPair: Array<string>;
      currentQueryString.split("&").forEach((kv: string) => {
        kvPair = kv.split("=");
        params.set(kvPair[0], kvPair[1]);
      });
    }

    let joinedKvPairs: Array<string> = [];
    params.forEach((v: string, k: string) => joinedKvPairs.push(k + "=" + v));
    return url + "?" + joinedKvPairs.join("&");
  }

  /**
   * Creates a map containing the key/value pairs in the dom querystring.
   * E.g. "http://example.com/?mykey=myvalue&mykey2=myvalue2"
   * {mykey: "myvalue", mykey2: "myvalue2"}
   *
   * @returns {Map<string, string>}
   */
  public static queryParams(): Map<string, string> {
    let params: Map<string, string> = new Map<string, string>();

    this.getQuerystring()
      .replace("?", "")
      .split("&")
      .map(p => p.split("="))
      .forEach((pair: Array<string>) => params.set(pair[0], pair[1] || ""));

    return params;
  }

  /**
   * Returns the current querystring
   * Wrapped for testing
   *
   * @returns {string}
   */
  public static getQuerystring() {
    return location.search;
  }
}
