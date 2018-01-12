import {AfterViewInit, Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {ChatModeratorSettingsClient} from "../../../../../shared/modules/biliomi/clients/settings/ChatModeratorSettings.client";

@Component({
  selector: "link-moderation-settings",
  templateUrl: require("./LinkModerationSettings.template.pug")
})
export class LinkModerationSettingsComponent implements AfterViewInit {
  private _chatModeratorSettingsClient: ChatModeratorSettingsClient;

  public linksAllowedControl: FormControl = new FormControl(false);
  public linkPermitExpireTimeControl: FormControl = new FormControl(0, [Validators.required, Validators.min(60000)]);
  public linkWhitelist: string[];

  constructor(chatModeratorSettingsClient: ChatModeratorSettingsClient) {
    this._chatModeratorSettingsClient = chatModeratorSettingsClient;
  }

  public async ngAfterViewInit() {
    await this._chatModeratorSettingsClient.load(true);
    this.linksAllowedControl.reset(this._chatModeratorSettingsClient.LinksAllowed);
    this.linkPermitExpireTimeControl.reset(this._chatModeratorSettingsClient.LinkPermitExpireTime);
    this.linkWhitelist = this._chatModeratorSettingsClient.LinkWhitelist;
  }

  public get isFormOk(): boolean {
    return (this.linksAllowedControl.value || this.linkPermitExpireTimeControl.valid);
  }

  public saveSettings() {
    if (this.isFormOk) {
      this._chatModeratorSettingsClient.LinksAllowed = this.linksAllowedControl.value;
      this._chatModeratorSettingsClient.LinkPermitExpireTime = this.linkPermitExpireTimeControl.value;
      this._chatModeratorSettingsClient.LinkWhitelist = this.linkWhitelist;
      this._chatModeratorSettingsClient.save();
    }
  }
}
