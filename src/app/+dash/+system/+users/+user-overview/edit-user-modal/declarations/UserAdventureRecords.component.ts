import {Component, Optional} from "@angular/core";
import {AdventureRecordsClient} from "../../../../../../shared/modules/biliomi/clients/model/AdventureRecords.client";
import {RestTableDataSource} from "../../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {EditUserModalComponent} from "../EditUserModal.component";
import IAdventureRecord = Biliomi.IAdventureRecord;

@Component({
  selector: "user-adventure-records",
  templateUrl: require("./UserAdventureRecords.template.pug")
})
export class UserAdventureRecordsComponent {
  private dataSource: RestTableDataSource<IAdventureRecord> = new RestTableDataSource<IAdventureRecord>();

  constructor(@Optional() parentModal: EditUserModalComponent,
              adventureRecordsClient: AdventureRecordsClient) {
    this.dataSource.client = adventureRecordsClient;
    this.dataSource.clientParams
      .set("filter", "Adventurer.Id = " + parentModal.editedUser.Id);
  }
}
