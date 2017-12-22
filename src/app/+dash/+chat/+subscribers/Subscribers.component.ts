import {Component, OnInit} from "@angular/core";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {FormControl, Validators} from "@angular/forms";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {SubscriberWatchSettingsClient} from "../../../shared/modules/biliomi/clients/settings/SubscriberWatchSettings.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {LatestSubscribersClient} from "../../../shared/modules/biliomi/clients/model/LatestSubscribers.client";
import IUser = Biliomi.IUser;

@Component({
  selector: "subscribers-page",
  templateUrl: require("./Subscribers.template.pug")
})
export class SubscribersComponent implements OnInit {
  private _subscriberWatchSettingsClient: SubscriberWatchSettingsClient;

  private latestSubscribersDataSource: RestTableDataSource<IUser> = new RestTableDataSource<IUser>();
  private subscriberRewardTier1Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private subscriberRewardTier2Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  private subscriberRewardTier3Control: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Latest Subscribers",
    sheetName: "Latest Subscribers",
    columns: [
      {objectPath: "$.DisplayName", headerName: "Username"},
      {objectPath: "$.SubscribeDate", headerName: "Subscribe date", formatter: XLSX_FORMATTER_DATE},
    ]
  };

  constructor(subscriberWatchSettingsClient: SubscriberWatchSettingsClient, latestSubscribersClient:LatestSubscribersClient) {
    this._subscriberWatchSettingsClient = subscriberWatchSettingsClient;
    this.latestSubscribersDataSource.client = latestSubscribersClient;
  }

  public ngOnInit() {
    this.initSettingsFields();
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
