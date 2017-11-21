import {Component, OnInit} from "@angular/core";
import {ChannelInfoClient} from "../../shared/modules/biliomi/clients/settings/ChannelInfo.client";

@Component({
  selector: "nav-channel-info-component",
  templateUrl: require("./NavChannelInfo.template.pug"),
  styleUrls: [require("./NavChannelInfo.less").toString()]
})
export class NavChannelInfoComponent implements OnInit {
  private channelInfoClient: ChannelInfoClient;
  private infoCardVisible: boolean = false;

  constructor(channelInfoClient: ChannelInfoClient) {
    this.channelInfoClient = channelInfoClient;
  }

  public ngOnInit() {
    this.channelInfoClient.load();
  }

  private toggleInfoCard() {
    this.infoCardVisible = !this.infoCardVisible;
  }
}
