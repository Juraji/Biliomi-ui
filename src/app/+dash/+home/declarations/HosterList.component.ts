import { Component } from "@angular/core";
import { PageEvent } from "@angular/material";
import { HostersClient } from "../../../shared/modules/biliomi/clients/Hosters.client";

@Component({
    selector: "hoster-list-component",
    templateUrl: require("./HosterList.template.html")
})
export class HosterListComponent {
    private hostersClient: HostersClient;
    private matPageEvent: PageEvent;

    constructor(hostersClient: HostersClient) {
        this.hostersClient = hostersClient;
        this.matPageEvent = new PageEvent();
        this.matPageEvent.pageSize = 10;
        this.matPageEvent.pageIndex = 0;
        this.matPageEvent.length = 0;
    }
}
