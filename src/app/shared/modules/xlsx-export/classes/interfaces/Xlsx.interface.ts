export type XlsxFormatterFunction = (cellValue: any, parentObject: any) => any;

export interface IXlsxExportConfig {
  // The name to use as download file name (without extension), defaults to sheetName
  fileName?: string;
  // The sheet name (tab name at the bottom of Excel)
  sheetName: string;
  // Column definitions
  columns: IXlsxColumnDefinition[];
}

export interface IXlsxColumnDefinition {
  // Dot separated path in model
  objectPath: string;
  // Display name for the column header, defaults to objectPath
  headerName?: string;
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
