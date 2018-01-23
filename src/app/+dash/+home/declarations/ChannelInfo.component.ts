import {Component} from "@angular/core";
import {ChannelStatusClient} from "../../../shared/modules/biliomi/clients/ChannelStatus.client";

import "./ChannelInfo.less";

@Component({
  selector: "channel-info-component",
  templateUrl: require("./ChannelInfo.template.pug")
})
export class ChannelInfoComponent {
  private channelInfoClient: ChannelStatusClient;

  constructor(channelInfoClient: ChannelStatusClient) {
    this.channelInfoClient = channelInfoClient;
  }
}
