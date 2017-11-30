import {IXlsxColumnDefinition, IXlsxExportConfig} from "./interfaces/Xlsx.interface";
import {Dictionary} from "../../ts-utilities/FunctionalInterface";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {ColInfo, Sheet, WorkBook} from "xlsx";

const AUTO_COLUMN_WIDTH_MARGIN: number = 5;

/**
 * Enables Excel (XLSX) exports in Typescript/Angular
 * NPM dependencies:
 *  npm i --save file-saver xlsx xlsx-style
 *  npm i --save-dev @types/file-saver
 */
export class XlsxExporter {
  private _config: IXlsxExportConfig;
  private _sheetHeaders: string[];
  private _fileName: string;

  constructor(config: IXlsxExportConfig) {
    this._config = config;
    this._sheetHeaders = this._config.columns.map((cd: IXlsxColumnDefinition) => cd.headerName || cd.objectPath);
    this._fileName = (this._config.fileName || this._config.sheetName) + ".xlsx";
  }

  /**
   * Export data to an excel sheet, as described in the config
   * @param {Object[]} data An array of objects corresponding to the config
   */
  public exportData(data: any[]) {
    // Create new work book
    let book: WorkBook = XLSX.utils.book_new();

    // Convert data objects to sheet rows
    let sheetRows: Dictionary[] = [];
    if (data != null) {
      sheetRows = data.map((o: Dictionary) => this._objectToRow(o));
    }

    // Generate a sheet from sheetRows
    let sheet: Sheet = XLSX.utils.json_to_sheet(sheetRows, {header: this._sheetHeaders});

    // Append the sheet to the work book
    XLSX.utils.book_append_sheet(book, sheet, this._config.sheetName);

    // Adjust column widths according definition or automatically
    this._processColumnWidths(sheet);

    // Present file as download to the browser
    let fileStream: any = XLSX.write(book, {type: "binary"});
    let fileBlob: any = new Blob([XlsxExporter._s2ab(fileStream)], {type: "application/octet-stream"});
    FileSaver.saveAs(fileBlob, this._fileName);
  }

  private _objectToRow(object: Dictionary): Dictionary {
    let finalObject: Dictionary = {};

    this._config.columns.forEach((colDef: IXlsxColumnDefinition) => {
      // Extract the value from the data object according to it's path
      let value: any = XlsxExporter._extractField(colDef.objectPath, object);

      // Infer the correct header name by definition or use the object path
      let columnKey: string = colDef.headerName || colDef.objectPath;

      // Set the default value if the value is NULL
      if (colDef.defaultValue != null) {
        value = colDef.defaultValue;
      }


      if (value != null) {

        if (colDef.formatter != null) {
          // Apply the definition formatter if value is not NULL and formatter is set
          finalObject[columnKey] = colDef.formatter.apply(null, [value, object]);
        } else {
          finalObject[columnKey] = value;
        }

        // Apply definition prefix
        if (colDef.prefix) {
          finalObject[columnKey] = colDef.prefix + finalObject[columnKey];
        }

        // Apply definition suffix
        if (colDef.suffix) {
          finalObject[columnKey] += colDef.suffix;
        }
      }
    });

    return finalObject;
  }

  private static _extractField(objectPath: string, object: Dictionary) {
    let pathArray: string[] = objectPath.split(".");
    let c: number = 0;
    let value: any = object;

    while (c < pathArray.length) {
      try {
        value = value[pathArray[c]];
        c++;
      } catch (e) {
        // Object does not contain a value at the given path, so return null
        console.info("XlsxExporter: Could not find a value at " + objectPath + ", value wil be NULL", object, e);
        return null;
      }
    }

    return value;
  }

  private static _s2ab(s: any): ArrayBuffer {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  private _processColumnWidths(sheet: Sheet) {
    let sheetCols: ColInfo[] = [];

    for (let i in this._sheetHeaders) {
      // Use the defined column width, else calculate it with margin
      if (this._config.columns[i].colWidth != null) {
        sheetCols[i] = {width: this._config.columns[i].colWidth};
      } else {
        sheetCols[i] = {width: this._sheetHeaders[i].length + AUTO_COLUMN_WIDTH_MARGIN};
      }
    }
    sheet["!cols"] = sheetCols;
  }
}
