import {Component} from "@angular/core";
import {PageEvent} from "@angular/material";
import {ViewersClient} from "../../../shared/modules/biliomi/clients/Viewers.client";

@Component({
  selector: "chatter-list-component",
  templateUrl: require("./ChatterList.template.pug")
})
export class ChatterListComponent {
  private viewersClient: ViewersClient;
  private matPageEvent: PageEvent;

  constructor(viewersClient: ViewersClient) {
    this.viewersClient = viewersClient;
    this.matPageEvent = new PageEvent();
    this.matPageEvent.pageSize = 10;
    this.matPageEvent.pageIndex = 0;
    this.matPageEvent.length = 0;
  }
}
