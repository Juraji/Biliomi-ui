import {Component, OnInit} from "@angular/core";
import {ChannelInfoClient} from "../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {MatDialog} from "@angular/material";
import {NavFollowerStatsModalComponent} from "./NavFollowerStatsModal.component";

@Component({
  selector: "nav-follower-stats-component",
  templateUrl: require("./NavFollowerStats.template.pug"),
  styleUrls: [require("./NavFollowerStats.less").toString()]
})
export class NavFollowerStatsComponent implements OnInit {
  private _dialog: MatDialog;

  private channelInfoClient: ChannelInfoClient;

  constructor(channelInfoClient: ChannelInfoClient,
              dialog: MatDialog) {
    this.channelInfoClient = channelInfoClient;
    this._dialog = dialog;
  }

  public async ngOnInit() {
    this.channelInfoClient.load();
  }

  public viewFollowerStats() {
    this._dialog.open(NavFollowerStatsModalComponent, {width: "600px"})
  }
}
