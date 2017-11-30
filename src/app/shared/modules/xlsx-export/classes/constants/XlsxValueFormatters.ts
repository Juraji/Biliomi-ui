import {XlsxFormatterFunction} from "../interfaces/Xlsx.interface";

export const XLSX_FORMATTER_JOIN_LIST: XlsxFormatterFunction = (v: any[]) => v.join(", ");
export const XLSX_FORMATTER_AS_TEXT: XlsxFormatterFunction = (v: any) => v.toString();
export const XLSX_FORMATTER_BOOLEAN_YES_NO: XlsxFormatterFunction = (v: boolean) => v ? "Yes" : "No";
