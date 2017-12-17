import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {ChatModeratorSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/ChatModeratorSettings.client";
import {UserGroupSelectComponent} from "../../../../../shared/components/UserGroupSelect.component";
import {StrikeSelectComponent} from "./StrikeSelect.component";

@Component({
  selector: "strikes-and-excemption-settings",
  templateUrl: require("./StrikesAndExcemptionSettings.template.pug")
})
export class StrikesAndExcemptionSettingsComponent implements AfterViewInit {
  private _chatModeratorSettingsClient: ChatModeratorSettingsClient;

  @ViewChild("exemptedGroupControl", {read: UserGroupSelectComponent})
  public exemptedGroupControl: UserGroupSelectComponent;

  @ViewChild("strike1", {read: StrikeSelectComponent})
  public firstStrikeControl: StrikeSelectComponent = new StrikeSelectComponent();

  @ViewChild("strike2", {read: StrikeSelectComponent})
  public secondStrikeControl: StrikeSelectComponent = new StrikeSelectComponent();

  @ViewChild("strike3", {read: StrikeSelectComponent})
  public thirdStrikeControl: StrikeSelectComponent = new StrikeSelectComponent();

  constructor(chatModeratorSettingsClient: ChatModeratorSettingsClient) {
    this._chatModeratorSettingsClient = chatModeratorSettingsClient;
  }

  public async ngAfterViewInit() {
    await this._chatModeratorSettingsClient.load(true);

    this.exemptedGroupControl.selectedGroup = this._chatModeratorSettingsClient.ExemptedGroup;

    this.firstStrikeControl.selectedStrike = this._chatModeratorSettingsClient.FirstStrike;
    this.secondStrikeControl.selectedStrike = this._chatModeratorSettingsClient.SecondStrike;
    this.thirdStrikeControl.selectedStrike = this._chatModeratorSettingsClient.ThirdStrike;
  }

  public saveSettings() {
    this._chatModeratorSettingsClient.ExemptedGroup = this.exemptedGroupControl.selectedGroup;

    this._chatModeratorSettingsClient.FirstStrike = this.firstStrikeControl.selectedStrike;
    this._chatModeratorSettingsClient.SecondStrike = this.secondStrikeControl.selectedStrike;
    this._chatModeratorSettingsClient.ThirdStrike = this.thirdStrikeControl.selectedStrike;
    this._chatModeratorSettingsClient.save();
  }
}
