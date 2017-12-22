import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ChannelInfoClient} from "../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {Biliomi} from "../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {LatestFollowersClient} from "../../shared/modules/biliomi/clients/model/LatestFollowers.client";
import IUser = Biliomi.IUser;
import {LatestSubscribersClient} from "../../shared/modules/biliomi/clients/model/LatestSubscribers.client";

@Component({
  selector: "nav-follower-stats-component",
  templateUrl: require("./NavFollowerStats.template.pug"),
  styleUrls: [require("./NavFollowerStats.less").toString()]
})
export class NavFollowerStatsComponent implements OnInit {
  private _parentElement: ElementRef;
  private _latestFollowersClient: LatestFollowersClient;
  private _latestSubscribersClient: LatestSubscribersClient;

  private followerStatsCardVisible: boolean = false;
  private channelInfoClient: ChannelInfoClient;
  private latestFollower: IUser;
  private latestSubscriber: IUser;

  @ViewChild("followerStatsCard", {read: ElementRef})
  private set _infoCardElement(content: ElementRef) {
    // Correct card position when shown, to account for randomness in preceding component sizes
    if (content != null) {
      let elLeft = this._parentElement.nativeElement.offsetLeft;
      content.nativeElement.style = "left: " + elLeft + "px";
    }
  }

  constructor(channelInfoClient: ChannelInfoClient,
              latestFollowersClient: LatestFollowersClient,
              latestSubscribersClient:LatestSubscribersClient,
              parentElement: ElementRef) {
    this.channelInfoClient = channelInfoClient;
    this._parentElement = parentElement;
    this._latestFollowersClient = latestFollowersClient;
    this._latestSubscribersClient = latestSubscribersClient;
  }

  public async ngOnInit() {
    this.channelInfoClient.load();
    this.latestFollower = await this._latestFollowersClient.getLatestFollower();
    this.latestSubscriber = await this._latestSubscribersClient.getLatestSubscriber();
  }

  public toggleFollowerStatsCard() {
    this.followerStatsCardVisible = !this.followerStatsCardVisible;
  }
}
