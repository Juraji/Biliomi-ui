import {Component} from "@angular/core";
import {HostRecordsClient} from "../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {TableDataSource} from "../../../shared/modules/ng-material/classes/TableDataSource";
import {SortBuilder} from "../../../shared/modules/biliomi/classes/SortBuilder";
import IHostRecord = Biliomi.IHostRecord;
import IDirection = Biliomi.IDirection;

@Component({
  selector: "hosts-page",
  templateUrl: require("./Hosts.template.pug")
})
export class HostsComponent {
  private _hostRecordsClient: HostRecordsClient;
  public incomingRecordsDataSource: TableDataSource<IHostRecord>;
  public outgoingRecordsDataSource: TableDataSource<IHostRecord>;

  constructor(hostRecordsClient: HostRecordsClient) {
    this._hostRecordsClient = hostRecordsClient;
  }

  public ngOnInit() {
    this.incomingRecordsDataSource = new TableDataSource<IHostRecord>(() => this._hostRecordsClient.getIncomingRecords());
    this.outgoingRecordsDataSource = new TableDataSource<IHostRecord>(() => this._hostRecordsClient.getOutgoingRecords());

    this.incomingRecordsDataSource.update();
    this.outgoingRecordsDataSource.update();
  }

  public updateOnRecordCreated(record: IHostRecord) {
    if (record.Direction == IDirection.INCOMING) {
      this.incomingRecordsDataSource.update();
    } else {
      this.outgoingRecordsDataSource.update();
    }
  }

  public async exportRecords() {
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - HostRecords",
      sheetName: "HostRecords",
      columns: [
        {objectPath: "$.Direction", headerName: "Direction"},
        {objectPath: "$.User.DisplayName", headerName: "Username"},
        {objectPath: "$.Date", headerName: "Follow date", formatter: XLSX_FORMATTER_DATE},
        {objectPath: "$.AutoHost", headerName: "Was auto host", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      ]
    };

    let exporter = new XlsxExporter(config);
    let sorter: SortBuilder = new SortBuilder()
      .add("Date", true);
    let data: IHostRecord[] = await this._hostRecordsClient.getList(sorter);

    exporter.exportData(data);
  }
}
