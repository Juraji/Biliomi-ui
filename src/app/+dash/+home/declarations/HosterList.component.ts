import {Component, OnInit} from "@angular/core";
import {ChannelInfoClient} from "../../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {PageEvent} from "@angular/material";

@Component({
  selector: "hoster-list-component",
  templateUrl: require("./HosterList.template.pug")
})
export class HosterListComponent implements OnInit {
  private channelInfoClient: ChannelInfoClient;
  private matPageEvent: PageEvent;

  constructor(channelInfoClient: ChannelInfoClient) {
    this.channelInfoClient = channelInfoClient;
    this.matPageEvent = new PageEvent();
    this.matPageEvent.pageSize = 10;
    this.matPageEvent.pageIndex = 0;
    this.matPageEvent.length = 0;
  }

  public ngOnInit() {
    this.channelInfoClient.load();
  }
}
