import {Component} from "@angular/core";
import {ChannelInfoClient} from "../../../shared/modules/biliomi/clients/settings/ChannelInfo.client";

@Component({
  selector: "channel-info-component",
  templateUrl: require("./ChannelInfo.template.pug"),
  styleUrls: [require("./ChannelInfo.less").toString()]
})
export class ChannelInfoComponent {
  private channelInfoClient: ChannelInfoClient;

  constructor(channelInfoClient: ChannelInfoClient) {
    this.channelInfoClient = channelInfoClient;
  }
}
