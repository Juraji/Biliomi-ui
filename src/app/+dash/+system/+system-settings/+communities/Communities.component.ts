import {AfterViewInit, Component} from "@angular/core";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {CommunitiesClient} from "../../../../shared/modules/biliomi/clients/model/Communities.client";
import {CommunitiesSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/CommunitiesSettings.client";
import {FormControl} from "@angular/forms";
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/DataTable";
import ICommunity = Biliomi.ICommunity;

@Component({
  selector: "communities",
  templateUrl: require("./Communities.template.pug")
})
export class CommunitiesComponent implements AfterViewInit {
  private _communitiesSettingsClient: CommunitiesSettingsClient;
  public communitiesDataSource: RestTableDataSource<ICommunity> = new RestTableDataSource<ICommunity>();

  public communities: ICommunity[];
  public autoUpdateCommunitiesControl: FormControl = new FormControl(false);

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Communities",
    sheetName: "Communities",
    columns: [
      {objectPath: "$.Name", headerName: "Name"},
      {objectPath: "$.Owner.DisplayName", headerName: "Owner"},
      {objectPath: "$.TwitchId", headerName: "Twitch Id"}
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "owner": "Owner.Username"
  };

  constructor(communitiesClient: CommunitiesClient, communitesSettingsClient: CommunitiesSettingsClient) {
    this.communitiesDataSource.client = communitiesClient;
    this._communitiesSettingsClient = communitesSettingsClient;
  }

  public async ngAfterViewInit() {
    await this._communitiesSettingsClient.load(true);
    this.initFields();
  }

  public initFields() {
    this.autoUpdateCommunitiesControl.setValue(this._communitiesSettingsClient.AutoUpdateCommunities);
    this.communities = this._communitiesSettingsClient.DefaultCommunities.slice();
  }

  public async saveSettings() {
    this._communitiesSettingsClient.AutoUpdateCommunities = this.autoUpdateCommunitiesControl.value;
    this._communitiesSettingsClient.DefaultCommunities = this.communities;
    await this._communitiesSettingsClient.save();
    this.initFields();
  }
}
