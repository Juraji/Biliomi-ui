import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { IXlsxColumnDefinition, IXlsxExportConfig, IXlsXRowObject } from "./interfaces/Xlsx";
import { JSONPath } from "../../tools/JSONPath";
import { Callable } from "../../tools/FunctionalInterface";

const AUTO_COLUMN_WIDTH_MARGIN: number = 5;
// Possible booktypes are: xlsx, xlsm, xlsb, xls, biff8, biff5, biff2, xlml, ods, fods, csv, txt, sylk, html, dif, rtf, prn.
const BOOK_TYPE: XLSX.BookType = "xlsx";

/**
 * Enables Excel (XLSX) exports in Typescript/Angular
 * NPM dependencies:
 *  npm i --save file-saver xlsx
 *  npm i --save-dev @types/file-saver
 */
export class XlsxExporter {
    private _config: IXlsxExportConfig;
    private _sheetHeaders: string[];
    private _fileName: string;
    private _columnWidths: number[];

    constructor(config: IXlsxExportConfig) {
        this._config = config;
        this._sheetHeaders = this._config.columns
            .map((cd: IXlsxColumnDefinition) => XlsxExporter._mapSheetHeaderName(cd.headerName));

        this._fileName = (this._config.fileName || this._config.sheetName) + "." + BOOK_TYPE;
    }

    private static _s2ab(s: any): ArrayBuffer {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    private static _mapSheetHeaderName(headerName: string | Callable<string>) {
        return (typeof headerName === "function" ? headerName() : headerName);
    }

    /**
     * Export data to an excel sheet, as described in the config
     * @param {Object[]} data An array of objects corresponding to the config
     */
    public exportData(data: any[]) {
        // Create new work book
        let book: XLSX.WorkBook = XLSX.utils.book_new();

        // Set initialColumnWidths
        this._columnWidths = this._config.columns.map((colDef: IXlsxColumnDefinition) => colDef.headerName.length);

        // Convert data objects to sheet rows
        let sheetRows: IXlsXRowObject[] = [];
        if (data != null) {
            sheetRows = data.map((o: any) => this._objectToRow(o));
        }

        // Sort rows according to config
        this._sortSheetRows(sheetRows);

        // Generate a sheet from sheetRows
        let sheet: XLSX.Sheet = XLSX.utils.json_to_sheet(sheetRows, {header: this._sheetHeaders});

        // Append the sheet to the work book
        XLSX.utils.book_append_sheet(book, sheet, this._config.sheetName);

        // Adjust column widths according definition or automatically
        this._processColumnWidths(sheet);

        // Present file as download to the browser
        let fileStream: any = XLSX.write(book, {type: "binary", bookType: BOOK_TYPE});
        let fileBlob: any = new Blob([XlsxExporter._s2ab(fileStream)], {type: "application/octet-stream"});
        FileSaver.saveAs(fileBlob, this._fileName);
    }

    private _objectToRow(object: any): IXlsXRowObject {
        let finalObject: IXlsXRowObject = {};
        let colDef: IXlsxColumnDefinition;
        let i = 0;

        while (i < this._config.columns.length) {
            colDef = this._config.columns[i];

            // Extract the value from the data object according to it's path
            let value: any = JSONPath.execute(colDef.objectPath, object);

            // Set the default value if set and the value is NULL
            if (value == null && colDef.defaultValue != null) {
                value = colDef.defaultValue;
            }

            if (value != null) {
                if (colDef.formatter) {
                    // Apply the definition formatter if value is not NULL and formatter is set
                    value = colDef.formatter.apply(null, [value, object]);
                }

                // Apply definition prefix
                if (colDef.prefix) {
                    value = colDef.prefix + value;
                }

                // Apply definition suffix
                if (colDef.suffix) {
                    value += colDef.suffix;
                }

                let valueLength = ("" + value).length;
                if (valueLength > this._columnWidths[i]) {
                    this._columnWidths[i] = valueLength;
                }

                finalObject[XlsxExporter._mapSheetHeaderName(colDef.headerName)] = value;
            }

            i++;
        }

        return finalObject;
    }

    private _processColumnWidths(sheet: XLSX.Sheet) {
        let sheetCols: XLSX.ColInfo[] = [];
        let i = 0;

        while (i < this._sheetHeaders.length) {
            // Use the defined column width, else calculate it with margin
            if (this._config.columns[i].colWidth == null) {
                sheetCols[i] = {width: ~~(this._columnWidths[i] * .8) + AUTO_COLUMN_WIDTH_MARGIN};
            } else {
                sheetCols[i] = {width: this._config.columns[i].colWidth};
            }

            i++;
        }

        sheet["!cols"] = sheetCols;
    }

    private _sortSheetRows(sheetRows: IXlsXRowObject[]) {
        if (this._config.sortBy) {
            sheetRows.sort((a: IXlsXRowObject, b: IXlsXRowObject) => {
                let aValue: any = a[this._config.sortBy];
                let bValue: any = b[this._config.sortBy];

                if (aValue == null || bValue == null) {
                    return (aValue == null ? -1 : 1);
                } else {
                    return aValue.localeCompare(bValue);
                }
            });
        }
    }
}
