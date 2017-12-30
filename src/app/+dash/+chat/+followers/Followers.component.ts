import {Component, OnInit} from "@angular/core";
import {FollowerWatchSettingsClient} from "../../../shared/modules/biliomi/clients/settings/FollowerWatchSettings.client";
import {FormControl, Validators} from "@angular/forms";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {LatestFollowersClient} from "../../../shared/modules/biliomi/clients/model/LatestFollowers.client";
import IUser = Biliomi.IUser;

@Component({
  selector: "followers-page",
  templateUrl: require("./Followers.template.pug")
})
export class FollowersComponent implements OnInit {
  private _followerWatchSettingsClient: FollowerWatchSettingsClient;

  private latestFollowersDataSource: RestTableDataSource<IUser> = new RestTableDataSource<IUser>();
  private followerRewardControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Latest Followers",
    sheetName: "Latest Followers",
    columns: [
      {objectPath: "$.DisplayName", headerName: "Username"},
      {objectPath: "$.FollowDate", headerName: "Follow date", formatter: XLSX_FORMATTER_DATE}
    ]
  };

  constructor(followerWatchSettingsClient: FollowerWatchSettingsClient, latestFollowersClient: LatestFollowersClient) {
    this._followerWatchSettingsClient = followerWatchSettingsClient;
    this.latestFollowersDataSource.client = latestFollowersClient;
  }

  public ngOnInit() {
    this.initSettingsFields();
  }

  public async initSettingsFields() {
    await this._followerWatchSettingsClient.load(true);
    this.followerRewardControl.setValue(this._followerWatchSettingsClient.Reward);
  }

  public get isSettingsFormOk(): boolean {
    return this.followerRewardControl.valid;
  }

  public saveSettings() {
    if (this.isSettingsFormOk) {
      this._followerWatchSettingsClient.Reward = this.followerRewardControl.value;
      this._followerWatchSettingsClient.save();
    }
  }
}
