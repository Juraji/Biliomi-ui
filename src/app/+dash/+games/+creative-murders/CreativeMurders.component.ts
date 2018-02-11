import {Component} from "@angular/core";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {KillRecordsClient} from "../../../shared/modules/biliomi/clients/model/KillRecords.client";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import IKillRecord = Biliomi.IKillRecord;
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";

@Component({
  selector: "creative-murders",
  templateUrl: require("./CreativeMurders.template.html")
})
export class CreativeMurdersComponent {
  public dataSource: RestTableDataSource<IKillRecord> = new RestTableDataSource<IKillRecord>();

  public filterMapping: TableFilterNameMapping = {
    "killer": "Killer.Username",
    "target": "Target.Username",
    "suicide": "IsSuicide"
  };

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Creative Murders",
    sheetName: "Creative Murders",
    columns: [
      {objectPath: "$.Killer.DisplayName", headerName: "Killer"},
      {objectPath: "$.Target.DisplayName", headerName: "Target"},
      {objectPath: "$.IsSuicide", headerName: "Suicide", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE}
    ]
  };

  constructor(killRecordsClient: KillRecordsClient) {
    this.dataSource.client = killRecordsClient;
  }
}
