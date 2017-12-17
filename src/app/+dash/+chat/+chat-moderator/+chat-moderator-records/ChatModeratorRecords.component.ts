import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {ModerationRecordsClient} from "../../../../shared/modules/biliomi/clients/model/ModerationRecords.client";
import {RestTableDataSource} from "../../../../shared/modules/ng-material/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatPaginator} from "@angular/material";
import IModerationRecord = Biliomi.IModerationRecord;

@Component({
  selector: "chat-moderator-records",
  templateUrl: require("./ChatModeratorRecords.template.pug")
})
export class ChatModeratorRecordsComponent implements AfterViewInit {
  private recordsDataSource: RestTableDataSource<IModerationRecord> = new RestTableDataSource<IModerationRecord>();

  @ViewChild("paginator", {read: MatPaginator})
  public paginator: MatPaginator;

  constructor(moderationRecordsClient: ModerationRecordsClient) {
    this.recordsDataSource.bindClient(moderationRecordsClient);
    this.recordsDataSource.sortBuilder.add("Date", true)
  }

  public ngAfterViewInit() {
    this.recordsDataSource.paginator = this.paginator;
    this.recordsDataSource.update();
  }

  public exportRecords() {
  }
}
