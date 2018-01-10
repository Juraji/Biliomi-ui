import {AfterViewInit, Component} from "@angular/core";
import {ChatModeratorSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/ChatModeratorSettings.client";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IUserGroup = Biliomi.IUserGroup;
import IModerationAction = Biliomi.IModerationAction;

@Component({
  selector: "strikes-and-excemption-settings",
  templateUrl: require("./StrikesAndExcemptionSettings.template.pug")
})
export class StrikesAndExcemptionSettingsComponent implements AfterViewInit {
  private _chatModeratorSettingsClient: ChatModeratorSettingsClient;

  public exemptedGroup: IUserGroup = null;
  public firstStrike: IModerationAction;
  public secondStrike: IModerationAction;
  public thirdStrike: IModerationAction;

  constructor(chatModeratorSettingsClient: ChatModeratorSettingsClient) {
    this._chatModeratorSettingsClient = chatModeratorSettingsClient;
  }

  public async ngAfterViewInit() {
    await this._chatModeratorSettingsClient.load(true);

    this.exemptedGroup = this._chatModeratorSettingsClient.ExemptedGroup;
    this.firstStrike = this._chatModeratorSettingsClient.FirstStrike;
    this.secondStrike = this._chatModeratorSettingsClient.SecondStrike;
    this.thirdStrike = this._chatModeratorSettingsClient.ThirdStrike;
  }

  public saveSettings() {
    this._chatModeratorSettingsClient.ExemptedGroup = this.exemptedGroup;

    this._chatModeratorSettingsClient.FirstStrike = this.firstStrike;
    this._chatModeratorSettingsClient.SecondStrike = this.secondStrike;
    this._chatModeratorSettingsClient.ThirdStrike = this.thirdStrike;
    this._chatModeratorSettingsClient.save();
  }
}
