import {Component, OnInit} from "@angular/core";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {UsersClient} from "../../../shared/modules/biliomi/clients/model/Users.client";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {MatTableDataSource} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {SubscriberWatchSettingsClient} from "../../../shared/modules/biliomi/clients/settings/SubscriberWatchSettings.client";
import IUser = Biliomi.IUser;

@Component({
  selector: "subscribers-page",
  templateUrl: require("./Subscribers.template.pug")
})
export class SubscribersComponent implements OnInit {
  private _subscriberWatchSettingsClient: SubscriberWatchSettingsClient;
  private _usersClient: UsersClient;

  private latestSubscribersDataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  private subscriberRewardTier1Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private subscriberRewardTier2Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private subscriberRewardTier3Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  constructor(subscriberWatchSettingsClient: SubscriberWatchSettingsClient, usersClient: UsersClient) {
    this._subscriberWatchSettingsClient = subscriberWatchSettingsClient;
    this._usersClient = usersClient;
  }

  public ngOnInit() {
    this.initSettingsFields();
    this.loadLatestSubscribers()
  }

  public async loadLatestSubscribers() {
    let latestSubscribers: IUser[] = await this._usersClient.getLatestSubscribers(20);
    if (latestSubscribers != null) {
      this.latestSubscribersDataSource.data = latestSubscribers;
    }
  }

  public exportLatestSubscribers() {
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - Latest Subscribers",
      sheetName: "Latest Subscribers",
      columns: [
        {objectPath: "$.DisplayName", headerName: "Username"},
        {objectPath: "$.SubscribeDate", headerName: "Subscribe date", formatter: XLSX_FORMATTER_DATE},
      ]
    };
    let exporter = new XlsxExporter(config);
    exporter.exportData(this.latestSubscribersDataSource.data);
  }

  public async initSettingsFields() {
    await this._subscriberWatchSettingsClient.load(true);
    this.subscriberRewardTier1Control.setValue(this._subscriberWatchSettingsClient.RewardTier1);
    this.subscriberRewardTier2Control.setValue(this._subscriberWatchSettingsClient.RewardTier2);
    this.subscriberRewardTier3Control.setValue(this._subscriberWatchSettingsClient.RewardTier3);
  }

  public get isSettingsFormOk(): boolean {
    return this.subscriberRewardTier1Control.valid
      && this.subscriberRewardTier2Control.valid
      && this.subscriberRewardTier3Control.valid;
  }

  public saveSettings() {
    if (this.isSettingsFormOk) {
      this._subscriberWatchSettingsClient.RewardTier1 = this.subscriberRewardTier1Control.value;
      this._subscriberWatchSettingsClient.RewardTier2 = this.subscriberRewardTier2Control.value;
      this._subscriberWatchSettingsClient.RewardTier3 = this.subscriberRewardTier3Control.value;
      this._subscriberWatchSettingsClient.save();
    }
  }
}
