export type XlsxFormatterFunction = (cellValue: any, parentObject: any) => any;
export type IXlsXRowObject = { [p: string]: any };

export enum XlsxBookType {
  XLSX = "xlsx",
  XLSM = "xlsm",
  XLSB = "xlsb",
  XLS = "xls",
  BIFF8 = "biff8",
  BIFF5 = "biff5",
  BIFF2 = "biff2",
  XLML = "xlml",
  ODS = "ods",
  FODS = "fods",
  CSV = "csv",
  TXT = "txt",
  SYLK = "sylk",
  HTML = "html",
  DIF = "dif",
  RTF = "rtf",
  PRN = "prn"
}

export interface IXlsxExportConfig {
  // The name to use as download file name (without extension), defaults to sheetName
  fileName?: string;
  // The sheet name (tab name at the bottom of Excel)
  sheetName: string;
  // Column definitions
  columns: IXlsxColumnDefinition[];
  // The type of file to export (xlsx, xls, csv...), defaults to xlsx
  bookType?: XlsxBookType;
  // The column header to sort by
  sortBy?: string;
}

export interface IXlsxColumnDefinition {
  // JSONPath-like value selector (e.g. $.Property.List[0].Property)
  objectPath: string;
  // Display name for the column header, defaults to objectPath
  headerName: string;
  // A postprocessor to be applied to resulting values, not called when value is NULL
  formatter?: XlsxFormatterFunction;
  // replace cellValue when value is NULL
  defaultValue?: any;
  // Column width in characters. Defaults to headerName.length + 5 for margin
  colWidth?: number;
  // Value prefix
  prefix?: string;
  // Value suffix
  suffix?: string;
}
