import {Component, Optional} from "@angular/core";
import {InvestmentRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/InvestmentRecords.client";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {EditUserComponent} from "../EditUser.component";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IInvestmentRecord = Biliomi.IInvestmentRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-investments",
  templateUrl: require("./UserInvestments.template.html")
})
export class UserInvestmentsComponent {
  public dataSource: RestTableDataSource<IInvestmentRecord> = new RestTableDataSource<IInvestmentRecord>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              investmentRecordsClient: InvestmentRecordsClient) {
    this.dataSource.client = investmentRecordsClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("invester.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
        .toString());
    }
  }
}
