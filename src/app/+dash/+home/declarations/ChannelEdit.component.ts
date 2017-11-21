import {Component, OnInit} from "@angular/core";
import {ChannelInfoClient} from "../../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {GamesClient} from "../../../shared/modules/biliomi/clients/model/Games.client";
import {FormControl, Validators} from "@angular/forms";
import {DefaultFormFieldStateMatcher} from "../../../shared/modules/ng-material/DefaultFormFieldStateMatcher";
import {BiliomiApiService} from "../../../shared/modules/biliomi/services/BiliomiApi.service";

@Component({
  selector: "channel-edit-component",
  templateUrl: require("./ChannelEdit.template.pug")
})
export class ChannelEditComponent implements OnInit {
  private _api: BiliomiApiService;
  private channelInfoClient: ChannelInfoClient;
  private gamesClient: GamesClient;

  private fieldMatcher = new DefaultFormFieldStateMatcher();
  private channelGameControl = new FormControl('', [Validators.required]);
  private channelStatusControl = new FormControl('', [Validators.required]);

  private steamIconLogo: NodeRequire = require("../../../../images/steam_icon_logo.svg");

  constructor(channelInfoClient: ChannelInfoClient, gamesClient: GamesClient, api:BiliomiApiService) {
    this.channelInfoClient = channelInfoClient;
    this.gamesClient = gamesClient;
    this._api = api;
  }

  public ngOnInit() {
    this.refreshFields()
  }

  private get formOk(): boolean {
    return this.channelGameControl.valid && this.channelStatusControl.valid;
  }

  private async refreshFields() {
    await this.channelInfoClient.load(true);
    await this.gamesClient.load(true);
    this.channelGameControl.setValue(this.channelInfoClient.CurrentGame.Name);
    this.channelStatusControl.setValue(this.channelInfoClient.Status);
  }

  private async submitChannelEdit() {
    if (this.formOk) {

      // Only update the game if it has actually changed
      if (this.channelGameControl.value != this.channelInfoClient.CurrentGame.Name){
        await this._api.postCommand("channel", "game", this.channelGameControl.value)
      }

      // Only update the status if it has actually changed
      if (this.channelStatusControl.value != this.channelInfoClient.Status) {
        await this._api.postCommand("channel", "status", this.channelStatusControl.value);
      }

      // Refresh the fields either way
      this.refreshFields();
    }
  }
}
