import {Component, OnInit} from "@angular/core";
import {FollowerWatchSettingsClient} from "../../../shared/modules/biliomi/clients/settings/FollowerWatchSettings.client";
import {FormControl, Validators} from "@angular/forms";
import {UsersClient} from "../../../shared/modules/biliomi/clients/model/Users.client";
import {MatTableDataSource} from "@angular/material";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import IUser = Biliomi.IUser;

@Component({
  selector: "followers-page",
  templateUrl: require("./Followers.template.pug")
})
export class FollowersComponent implements OnInit {
  private _followerWatchSettingsClient: FollowerWatchSettingsClient;
  private _usersClient: UsersClient;

  private latestFollowersDataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  private followerRewardControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  constructor(followerWatchSettingsClient: FollowerWatchSettingsClient, usersClient: UsersClient) {
    this._followerWatchSettingsClient = followerWatchSettingsClient;
    this._usersClient = usersClient;
  }

  public ngOnInit() {
    this.initSettingsFields();
    this.loadLatestFollowers()
  }

  public async loadLatestFollowers() {
    let latestFollowers: IUser[] = await this._usersClient.getLatestFollowers(20);
    if (latestFollowers != null) {
      this.latestFollowersDataSource.data = latestFollowers;
    }
  }

  public exportLatestFollowers() {
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - Latest Followers",
      sheetName: "Latest Followers",
      columns: [
        {objectPath: "$.DisplayName", headerName: "Username"},
        {objectPath: "$.FollowDate", headerName: "Follow date", formatter: XLSX_FORMATTER_DATE},
      ]
    };
    let exporter = new XlsxExporter(config);
    exporter.exportData(this.latestFollowersDataSource.data);
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
