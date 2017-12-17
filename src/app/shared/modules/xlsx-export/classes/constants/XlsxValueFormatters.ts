import {XlsxFormatterFunction} from "../interfaces/Xlsx.interface";
import {TimeUtils} from "../../../tools/TimeUtils";
import {DatePipe} from "../../../../pipes/Date.pipe";
import {CaseToWordPipe, CaseType} from "../../../../pipes/CaseToWord.pipe";

export const XLSX_FORMATTER_JOIN_LIST: XlsxFormatterFunction = (v: any[]) => v.join(", ");
export const XLSX_FORMATTER_AS_TEXT: XlsxFormatterFunction = (v: any) => v.toString();
export const XLSX_FORMATTER_BOOLEAN_YES_NO: XlsxFormatterFunction = (v: boolean) => v ? "Yes" : "No";
export const XLSX_FORMATTER_RELATIVE_TIME: XlsxFormatterFunction = (m: number) => TimeUtils.millisToRelTimeStrHMS(m, false, true);
export const XLSX_FORMATTER_DATE: XlsxFormatterFunction = (s: string) => new DatePipe().transform(s);
export const XLSX_FORMATTER_ENUM: XlsxFormatterFunction = (s: string) => new CaseToWordPipe().transform(s, CaseType.SCREAMING_SNAKE_CASE);
