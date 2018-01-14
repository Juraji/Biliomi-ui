import {Component, Optional} from "@angular/core";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {QuotesClient} from "../../../../../shared/modules/biliomi/clients/model/Quotes.client";
import {EditUserComponent} from "../EditUser.component";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IQuote = Biliomi.IQuote;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-quotes",
  templateUrl: require("./UserQuotes.template.pug")
})
export class UserQuotesComponent {
  public dataSource: RestTableDataSource<IQuote> = new RestTableDataSource<IQuote>();

  constructor(@Optional() editUserComponent: EditUserComponent,
              quotesClient: QuotesClient) {
    this.dataSource.client = quotesClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("User.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
        .toString());
    }
  }
}
