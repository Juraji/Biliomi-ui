import {Component, Optional} from "@angular/core";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import {EditUserComponent} from "../EditUser.component";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {RaidRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/RaidRecords.client";
import IRaidRecord = Biliomi.IRaidRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-raids",
  templateUrl: require("./UserRaids.template.pug")
})
export class UserRaidsComponent {
  public dataSource: RestTableDataSource<IRaidRecord> = new RestTableDataSource<IRaidRecord>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              raidRecordsClient: RaidRecordsClient) {
    this.dataSource.client = raidRecordsClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("channel.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
        .toString());
    }
  }
}
