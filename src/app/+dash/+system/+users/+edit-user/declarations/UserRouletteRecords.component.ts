import {Component, Optional} from "@angular/core";
import {EditUserComponent} from "../EditUser.component";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {RouletteRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/RouletteRecords.client";
import IRouletteRecord = Biliomi.IRouletteRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-roulette-records",
  templateUrl: require("./UserRouletteRecords.template.pug")
})
export class UserRouletteRecordsComponent {
  public dataSource: RestTableDataSource<IRouletteRecord> = new RestTableDataSource<IRouletteRecord>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              rouletteRecordsClient: RouletteRecordsClient) {
    this.dataSource.client = rouletteRecordsClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("user.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
        .toString());
    }
  }
}
