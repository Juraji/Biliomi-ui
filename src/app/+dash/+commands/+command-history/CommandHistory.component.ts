import {Component, OnInit} from "@angular/core";
import {CommandHistoryRecordsClient} from "../../../shared/modules/biliomi/clients/model/CommandHistoryRecords.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import ICommandHistoryRecord = Biliomi.ICommandHistoryRecord;

@Component({
  selector: "command-history",
  templateUrl: require("./CommandHistory.template.pug")
})
export class CommandHistoryComponent {
  public dataSource: RestTableDataSource<ICommandHistoryRecord> = new RestTableDataSource<ICommandHistoryRecord>();

  constructor(commandHistoryRecordsClient: CommandHistoryRecordsClient) {
    this.dataSource.client = commandHistoryRecordsClient;
  }
}
