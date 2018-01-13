import {Component, Optional} from "@angular/core";
import {EditUserComponent} from "../EditUser.component";
import {AdventureRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/AdventureRecords.client";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IAdventureRecord = Biliomi.IAdventureRecord;
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-adventures",
  templateUrl: require("./UserAdventures.template.pug")
})
export class UserAdventuresComponent {
  public dataSource: RestTableDataSource<IAdventureRecord> = new RestTableDataSource<IAdventureRecord>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              adventureRecordsClient: AdventureRecordsClient) {
    this.dataSource.client = adventureRecordsClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("user.username", IRestFilterOperator.EQUALS, editUserComponent.user.Username)
        .toString());
    }
  }
}
