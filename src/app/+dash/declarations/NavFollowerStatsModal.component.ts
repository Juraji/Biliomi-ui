import {Component, OnInit} from "@angular/core";
import {ChannelInfoClient} from "../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {MatDialogRef} from "@angular/material";
import {LatestFollowersClient} from "../../shared/modules/biliomi/clients/model/LatestFollowers.client";
import {LatestSubscribersClient} from "../../shared/modules/biliomi/clients/model/LatestSubscribers.client";
import {Biliomi} from "../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IUser = Biliomi.IUser;

@Component({
  selector: "nav-follower-stats-modal",
  templateUrl: require("./NavFollowerStatsModal.template.pug")
})
export class NavFollowerStatsModalComponent implements OnInit {
  private _dialogRef: MatDialogRef<NavFollowerStatsModalComponent>;
  private _latestFollowersClient: LatestFollowersClient;
  private _latestSubscribersClient: LatestSubscribersClient;
  private channelInfoClient: ChannelInfoClient;

  public latestFollower: IUser;
  public latestSubscriber: IUser;

  constructor(channelInfoClient: ChannelInfoClient,
              latestFollowersClient: LatestFollowersClient,
              latestSubscribersClient: LatestSubscribersClient,
              dialogRef: MatDialogRef<NavFollowerStatsModalComponent>) {
    this._latestFollowersClient = latestFollowersClient;
    this._latestSubscribersClient = latestSubscribersClient;
    this._dialogRef = dialogRef;
    this.channelInfoClient = channelInfoClient;
  }

  public async ngOnInit() {
    this.channelInfoClient.load();
    this.latestFollower = await this._latestFollowersClient.getLatestFollower();
    this.latestSubscriber = await this._latestSubscribersClient.getLatestSubscriber();
  }

  public close() {
    this._dialogRef.close();
  }
}
