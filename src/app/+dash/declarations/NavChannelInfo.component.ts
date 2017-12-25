import {Component, OnInit} from "@angular/core";
import {ChannelInfoClient} from "../../shared/modules/biliomi/clients/settings/ChannelInfo.client";

@Component({
  selector: "nav-channel-info-component",
  templateUrl: require("./NavChannelInfo.template.pug")
})
export class NavChannelInfoComponent implements OnInit {
  private channelInfoClient: ChannelInfoClient;

  constructor(channelInfoClient: ChannelInfoClient) {
    this.channelInfoClient = channelInfoClient;
  }

  public ngOnInit() {
    this.channelInfoClient.load();
  }
}
