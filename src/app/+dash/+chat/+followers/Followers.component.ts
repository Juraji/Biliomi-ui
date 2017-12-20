import {Component, OnInit} from "@angular/core";
import {FollowerWatchSettingsClient} from "../../../shared/modules/biliomi/clients/settings/FollowerWatchSettings.client";
import {FormControl, Validators} from "@angular/forms";
import {UsersClient} from "../../../shared/modules/biliomi/clients/model/Users.client";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {TableDataSource} from "../../../shared/modules/data-table/classes/TableDataSource";
import IUser = Biliomi.IUser;

@Component({
  selector: "followers-page",
  templateUrl: require("./Followers.template.pug")
})
export class FollowersComponent implements OnInit {
  private _followerWatchSettingsClient: FollowerWatchSettingsClient;
  private _usersClient: UsersClient;

  private latestFollowersDataSource: TableDataSource<IUser>;
  private followerRewardControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Latest Followers",
    sheetName: "Latest Followers",
    columns: [
      {objectPath: "$.DisplayName", headerName: "Username"},
      {objectPath: "$.FollowDate", headerName: "Follow date", formatter: XLSX_FORMATTER_DATE},
    ]
  };

  constructor(followerWatchSettingsClient: FollowerWatchSettingsClient, usersClient: UsersClient) {
    this._followerWatchSettingsClient = followerWatchSettingsClient;
    this._usersClient = usersClient;

    this.latestFollowersDataSource = new TableDataSource<IUser>(() => this._usersClient.getLatestFollowers(20))
  }

  public ngOnInit() {
    this.initSettingsFields();
    this.loadLatestFollowers()
  }

  public async loadLatestFollowers() {
    this.latestFollowersDataSource.update()
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
