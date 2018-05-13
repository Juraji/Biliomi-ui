import { Component, Optional } from "@angular/core";
import { FilterBuilder } from "../../../../../shared/modules/biliomi/classes/FilterBuilder";
import { EditUserComponent } from "../EditUser.component";
import { RestTableDataSource } from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { RaidRecordsClient } from "../../../../../shared/modules/biliomi/clients/model/RaidRecords.client";
import { DialogsService } from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import IRaidRecord = Biliomi.IRaidRecord;
import IRestFilterOperator = Biliomi.IRestFilterOperator;
import IUser = Biliomi.IUser;
import IDirection = Biliomi.IDirection;

@Component({
    selector: "user-raids",
    templateUrl: require("./UserRaids.template.html")
})
export class UserRaidsComponent {
    public dataSource: RestTableDataSource<IRaidRecord> = new RestTableDataSource<IRaidRecord>();
    private _raidRecordsClient: RaidRecordsClient;
    private _dialogs: DialogsService;
    private _user: IUser;

    constructor(@Optional() editUserComponent: EditUserComponent,
                raidRecordsClient: RaidRecordsClient,
                dialogs: DialogsService) {
        this._raidRecordsClient = raidRecordsClient;
        this._dialogs = dialogs;
        this.dataSource.client = raidRecordsClient;

        if (editUserComponent) {
            this._user = editUserComponent.user;
            this.dataSource.clientParams.set("filter", new FilterBuilder()
                .add("channel.id", IRestFilterOperator.EQUALS, editUserComponent.user.Id)
                .toString());
        }
    }

    public async registerRecord(direction: IDirection) {
        let confirmed = await this._dialogs.confirm(`Are you sure you want to register an ${direction.toLowerCase()} raid for ${this._user.DisplayName}?`);
        if (confirmed) {
            let success = await this._raidRecordsClient.registerRaid(direction, this._user.Username);
            if (success) {
                this.dataSource.update();
            }
        }
    }
}
