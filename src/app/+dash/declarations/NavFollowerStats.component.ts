import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ChannelInfoClient} from "../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {UsersClient} from "../../shared/modules/biliomi/clients/model/Users.client";
import {Biliomi} from "../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IUser = Biliomi.IUser;

@Component({
  selector: "nav-follower-stats-component",
  templateUrl: require("./NavFollowerStats.template.pug"),
  styleUrls: [require("./NavFollowerStats.less").toString()]
})
export class NavFollowerStatsComponent implements OnInit {
  private _parentElement: ElementRef;
  private followerStatsCardVisible: boolean = false;
  private channelInfoClient: ChannelInfoClient;
  private usersClient: UsersClient;

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

  constructor(channelInfoClient: ChannelInfoClient, usersClient: UsersClient, parentElement: ElementRef) {
    this.channelInfoClient = channelInfoClient;
    this.usersClient = usersClient;
    this._parentElement = parentElement;
  }

  public async ngOnInit() {
    this.channelInfoClient.load();
    this.latestFollower = await this.usersClient.getLatestFollower();
    this.latestSubscriber = await this.usersClient.getLatestSubscriber();
  }

  private toggleFollowerStatsCard() {
    this.followerStatsCardVisible = !this.followerStatsCardVisible;
  }
}
