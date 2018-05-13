export class StringUtils {
    /**
     * Pad a number on the left side using the given length and padder
     *
     * @param {number} n The number to pad
     * @param {number} length The length to pad to
     * @param {string} pad A single character to use as padder
     * @returns {string}
     */
    public static strPad(n: number, length: number = 2, pad: string = "0"): string {
        let nStr = n.toString();
        if (length < nStr.length) return nStr;
        return Array(length - nStr.length + 1).join(pad) + nStr;
    }

    /**
     * Replace tokens in a pattern string like Java's MessageFormat::format()
     * - Does not format the replacements
     * - Does not care about apostrophes
     * - Supports reuse of tokens (like "{0} {1} {2} {0}")
     *
     * {0} will be replaced by the value on element 0 of replacements
     * {1} with element 1
     * etc...
     *
     * @param {string} pattern
     * @param {Array} replacements
     * @returns {string}
     */
    public static messageFormat(pattern: string, ...replacements: Array<any>) {
        if (StringUtils.isNotEmpty(pattern) && replacements != null && replacements.length > 0) {
            let pi: number;
            let piPat: string;
            for (pi = 0; pi < replacements.length; pi++) {
                piPat = "{" + pi + "}";
                while (pattern.indexOf(piPat) > -1) {
                    pattern = pattern.replace(piPat, replacements[pi]);
                }
            }
        }

        return pattern;
    }

    /**
     * True if a string is null or the length is 0
     *
     * @param {String} value
     * @returns {Boolean}
     */
    public static isEmpty(value: string): boolean {
        return (value == null || value.length === 0);
    }

    /**
     * True if a string contains a value and is longer than 0
     *
     * @param {String} value
     * @returns {Boolean}
     */
    public static isNotEmpty(value: string): boolean {
        return !StringUtils.isEmpty(value);
    }

    /**
     * True if strings match ignoring casing
     *
     * @param {string} source
     * @param {string} comparison
     * @returns {boolean}
     */
    public static equalsIgnoreCase(source: string, comparison: string): boolean {
        if (source == null && comparison == null) return true;
        if (source == null || comparison == null) return false;
        if (source.length !== comparison.length) return false;
        return source.toLowerCase() === comparison.toLowerCase();
    }

    /**
     * True if source contains comparison ignoring casing
     *
     * @param {string} source
     * @param {string} comparison
     * @returns {boolean}
     */
    public static containsIgnoreCase(source: string, comparison: string): boolean {
        if (source == null && comparison == null) return true;
        if (source == null || comparison == null) return false;
        return source.toLowerCase().indexOf(comparison.toLowerCase()) > -1;
    }

    public static levenshteinDistance(a: string, b: string): number {
        const an = a ? a.length : 0;
        const bn = b ? b.length : 0;
        if (an === 0) {
            return bn;
        }
        if (bn === 0) {
            return an;
        }
        const matrix = new Array<number[]>(bn + 1);
        for (let i = 0; i <= bn; ++i) {
            let row = matrix[i] = new Array<number>(an + 1);
            row[0] = i;
        }
        const firstRow = matrix[0];
        for (let j = 1; j <= an; ++j) {
            firstRow[j] = j;
        }
        for (let i = 1; i <= bn; ++i) {
            for (let j = 1; j <= an; ++j) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1], // substitution
                        matrix[i][j - 1], // insertion
                        matrix[i - 1][j] // deletion
                    ) + 1;
                }
            }
        }
        return matrix[bn][an];
    }
}
