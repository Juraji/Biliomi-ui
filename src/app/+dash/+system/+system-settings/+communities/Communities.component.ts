import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {CommunitiesClient} from "../../../../shared/modules/biliomi/clients/model/Communities.client";
import {CommunitesSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/CommunitesSettings.client";
import {FormControl} from "@angular/forms";
import {CommunityChipListComponent} from "../../../../shared/components/CommunityChipList.component";
import ICommunity = Biliomi.ICommunity;
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/TableFilterMapping.interface";

@Component({
  selector: "communities",
  templateUrl: require("./Communities.template.pug")
})
export class CommunitiesComponent implements AfterViewInit {
  private _communitesSettingsClient: CommunitesSettingsClient;
  public communitiesDataSource: RestTableDataSource<ICommunity> = new RestTableDataSource<ICommunity>();

  @ViewChild("communitiesControl", {read: CommunityChipListComponent})
  public communitiesControl: CommunityChipListComponent;
  public autoUpdateCommunitiesControl: FormControl = new FormControl(false)

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Communities",
    sheetName: "Communities",
    columns: [
      {objectPath: "$.Name", headerName: "Name"},
      {objectPath: "$.Owner.DisplayName", headerName: "Owner"},
      {objectPath: "$.TwitchId", headerName: "Twitch Id"},
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "owner": "Owner.Username",
  };

  constructor(communitiesClient: CommunitiesClient, communitesSettingsClient: CommunitesSettingsClient) {
    this.communitiesDataSource.client = communitiesClient;
    this._communitesSettingsClient = communitesSettingsClient;
  }

  public async ngAfterViewInit() {
    await this._communitesSettingsClient.load(true);
    this.initFields();
  }

  public initFields() {
    this.autoUpdateCommunitiesControl.setValue(this._communitesSettingsClient.AutoUpdateCommunities);
    this.communitiesControl.selectedCommunities = this._communitesSettingsClient.DefaultCommunities.slice();
  }

  public async saveSettings() {
    this._communitesSettingsClient.AutoUpdateCommunities = this.autoUpdateCommunitiesControl.value;
    this._communitesSettingsClient.DefaultCommunities = this.communitiesControl.selectedCommunities;
    await this._communitesSettingsClient.save();
    this.initFields();
  }
}
