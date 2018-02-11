import {Component, Optional} from "@angular/core";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {KillRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/KillRecords.client";
import {EditUserComponent} from "../EditUser.component";
import IKillRecord = Biliomi.IKillRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-creative-murders",
  templateUrl: require("./UserCreativeMurders.template.html")
})
export class UserCreativeMurdersComponent {
  private dataSource: RestTableDataSource<IKillRecord> = new RestTableDataSource<IKillRecord>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              killRecordsClient: KillRecordsClient) {
    this.dataSource.client = killRecordsClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("killer.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
        .toString());
    }
  }
}
