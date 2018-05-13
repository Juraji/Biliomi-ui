import { Component, Optional } from "@angular/core";
import { RestTableDataSource } from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { EditUserComponent } from "../EditUser.component";
import { AchievementRecordsClient } from "../../../../../shared/modules/biliomi/clients/model/AchievementRecords.client";
import { FilterBuilder } from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import IAchievementRecord = Biliomi.IAchievementRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;

@Component({
    selector: "user-achievements",
    templateUrl: require("./UserAchievements.template.html")
})
export class UserAchievementsComponent {
    public dataSource: RestTableDataSource<IAchievementRecord> = new RestTableDataSource<IAchievementRecord>();

    constructor(@Optional() editUserComponent: EditUserComponent,
                achievementRecordsClient: AchievementRecordsClient) {
        this.dataSource.client = achievementRecordsClient;

        if (editUserComponent) {
            this.dataSource.clientParams.set("filter", new FilterBuilder()
                .add("user.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
                .toString());
        }
    }
}
