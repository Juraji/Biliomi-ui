import {Component, OnInit} from "@angular/core";
import {ChannelInfoClient} from "../../shared/modules/biliomi/clients/settings/ChannelInfo.client";

@Component({
  selector: "nav-follower-stats-component",
  templateUrl: require("./NavFollowerStats.template.pug"),
  styleUrls: [require("./NavFollowerStats.less").toString()]
})
export class NavFollowerStatsComponent implements OnInit {
  private channelInfoClient: ChannelInfoClient;

  constructor(channelInfoClient: ChannelInfoClient) {
    this.channelInfoClient = channelInfoClient;
  }

  public ngOnInit() {
    this.channelInfoClient.load();
  }
}
