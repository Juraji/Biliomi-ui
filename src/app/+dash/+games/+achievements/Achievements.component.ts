import { Component, OnInit } from "@angular/core";
import { AchievementRecordsClient } from "../../../shared/modules/biliomi/clients/model/AchievementRecords.client";
import { RestTableDataSource } from "../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { IXlsxExportConfig } from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import { XLSX_FORMATTER_DATE } from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import { TableFilterNameMapping } from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import { FormControl } from "@angular/forms";
import { AchievementSettingsClient } from "../../../shared/modules/biliomi/clients/settings/AchievementSettings.client";
import { DialogsService } from "../../../shared/modules/dialogs/services/Dialogs.service";
import IAchievementRecord = Biliomi.IAchievementRecord;

@Component({
    selector: "achievements",
    templateUrl: require("./Achievements.template.html")
})
export class AchievementsComponent implements OnInit {
    public achievementsEnabledControl: FormControl = new FormControl(true);
    public achievementsDataSource: RestTableDataSource<IAchievementRecord> = new RestTableDataSource<IAchievementRecord>();
    public filterMapping: TableFilterNameMapping = {
        "username": "User.Username"
    };
    public exportConfig: IXlsxExportConfig = {
        fileName: "Biliomi - Achievements",
        sheetName: "Achievements",
        columns: [
            {objectPath: "$.User.DisplayName", headerName: "Username"},
            {objectPath: "$.AchievementId", headerName: "Achievement Id"},
            {objectPath: "$.Achievement", headerName: "Achievement"},
            {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE}
        ]
    };
    private _achievementSettingsClient: AchievementSettingsClient;
    private _dialog: DialogsService;

    constructor(achievementRecordsClient: AchievementRecordsClient,
                achievementSettingsClient: AchievementSettingsClient,
                dialog: DialogsService) {
        this._achievementSettingsClient = achievementSettingsClient;
        this.achievementsDataSource.client = achievementRecordsClient;
        this._dialog = dialog;
    }

    public async ngOnInit() {
        await this._achievementSettingsClient.load(true);
        this.initSettingsFields();
    }

    public initSettingsFields() {
        this.achievementsEnabledControl.reset(this._achievementSettingsClient.AchievementsEnabled);
    }

    public async saveSettings(): Promise<boolean> {
        this._achievementSettingsClient.AchievementsEnabled = this.achievementsEnabledControl.value;
        let result = await this._achievementSettingsClient.save();
        if (result != null) {
            this.initSettingsFields();
        }

        return result != null;
    }

    public async deleteRecord(record: IAchievementRecord) {
        let confirmed = await this._dialog.confirm(`Are you sure you want to delete this achievement for ${record.User.DisplayName}`);
        if (confirmed) {
            let success: boolean = await this.achievementsDataSource.client.delete(record.Id);
            if (success) {
                this.achievementsDataSource.update();
            }
        }
    }
}
