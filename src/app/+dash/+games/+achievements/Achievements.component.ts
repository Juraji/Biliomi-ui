import {Component, OnInit} from "@angular/core";
import {AchievementRecordsClient} from "../../../shared/modules/biliomi/clients/model/AchievementRecords.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import {FormControl} from "@angular/forms";
import {AchievementSettingsClient} from "../../../shared/modules/biliomi/clients/settings/AchievementSettings.client";
import {ConfirmDialogService} from "../../../shared/modules/confirm-dialog/services/ConfirmDialog.service";
import IAchievementRecord = Biliomi.IAchievementRecord;

@Component({
  selector: "achievements",
  templateUrl: require("./Achievements.template.pug")
})
export class AchievementsComponent implements OnInit {
  private _achievementSettingsClient: AchievementSettingsClient;
  private _dialog: ConfirmDialogService;

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

  constructor(achievementRecordsClient: AchievementRecordsClient,
              achievementSettingsClient: AchievementSettingsClient,
              dialog: ConfirmDialogService) {
    this._achievementSettingsClient = achievementSettingsClient;
    this.achievementsDataSource.client = achievementRecordsClient;
    this._dialog = dialog;
  }

  public ngOnInit() {
    this.initSettingsFields();
  }

  public async initSettingsFields() {
    await this._achievementSettingsClient.load(true);
    this.achievementsEnabledControl.setValue(this._achievementSettingsClient.AchievementsEnabled);
  }

  public async saveSettings() {
    this._achievementSettingsClient.AchievementsEnabled = this.achievementsEnabledControl.value;
    let result = await this._achievementSettingsClient.save();
    if (result == null) {
      this.initSettingsFields();
    }
  }

  public deleteRecord(record: IAchievementRecord) {
    this._dialog.confirm(`Are you sure you want to delete this achievement for ${record.User.DisplayName}`)
      .filter((confirmed: boolean) => confirmed)
      .subscribe(async () => {
        let success: boolean = await this.achievementsDataSource.client.delete(record.Id);
        if (success) {
          this.achievementsDataSource.update();
        }
      });
  }
}
