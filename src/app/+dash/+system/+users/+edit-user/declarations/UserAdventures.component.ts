import {Component, Optional} from "@angular/core";
import {EditUserComponent} from "../EditUser.component";
import {AdventureRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/AdventureRecords.client";
import {RestTableDataSource} from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FilterBuilder} from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IAdventureRecord = Biliomi.IAdventureRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
  selector: "user-adventures",
  templateUrl: require("./UserAdventures.template.pug")
})
export class UserAdventuresComponent {
  public dataSource: RestTableDataSource<IAdventureRecord> = new RestTableDataSource<IAdventureRecord>();

  public get totalAdventures(): number {
    return this.dataSource.currentData
      .filter((r: IAdventureRecord) => !r.ByTamagotchi)
      .length;
  }

  public get totalAdventuresSurvived(): number {
    return this.dataSource.currentData
      .filter((r: IAdventureRecord) => !r.ByTamagotchi && r.Payout > 0)
      .length;
  }

  public get totalAdventuresSurvivedByTamagotchi(): number {
    return this.dataSource.currentData
      .filter((r: IAdventureRecord) => r.ByTamagotchi && r.Payout > 0)
      .length;
  }

  public get totalBet(): number {
    return this.dataSource.currentData
      .filter((r: IAdventureRecord) => !r.ByTamagotchi)
      .map((r: IAdventureRecord) => r.Bet)
      .reduce((l: number, r: number) => l + r, 0);
  }

  public get totalPayouts(): number {
    return this.dataSource.currentData
      .map((r: IAdventureRecord) => r.Payout)
      .reduce((l: number, r: number) => l + r, 0);
  }

  constructor(@Optional() editUserComponent: EditUserComponent,
              adventureRecordsClient: AdventureRecordsClient) {
    this.dataSource.client = adventureRecordsClient;

    if (editUserComponent) {
      this.dataSource.clientParams.set("filter", new FilterBuilder()
        .add("adventurer.username", IRestFilterOperator.EQUALS, editUserComponent.user.Username)
        .toString());
    }
  }
}
