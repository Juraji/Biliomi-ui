import {Component} from "@angular/core";
import {ChannelStatusClient} from "../../../shared/modules/biliomi/clients/ChannelStatus.client";

@Component({
  selector: "channel-info-component",
  templateUrl: require("./ChannelInfo.template.pug"),
  styleUrls: [require("./ChannelInfo.less").toString()]
})
export class ChannelInfoComponent {
  private channelInfoClient: ChannelStatusClient;

  constructor(channelInfoClient: ChannelStatusClient) {
    this.channelInfoClient = channelInfoClient;
  }
}
