import {Component, Optional} from "@angular/core";
import {EditUserComponent} from "../EditUser.component";
import {DonationsClient} from "../../../../../shared/modules/biliomi/clients/model/Donations.client";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IDonation = Biliomi.IDonation;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-donations",
  templateUrl: require("./UserDonations.template.pug")
})
export class UserDonationsComponent {
  public dataSource: RestTableDataSource<IDonation> = new RestTableDataSource<IDonation>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              donationsClient: DonationsClient) {
    this.dataSource.client = donationsClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("user.username", IRestFilterOperator.EQUALS, editUserComponent.user.Username)
        .toString());
    }
  }
}
