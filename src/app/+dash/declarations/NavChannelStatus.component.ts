import { Component } from "@angular/core";
import { ChannelStatusClient } from "../../shared/modules/biliomi/clients/ChannelStatus.client";
import { ViewersClient } from "../../shared/modules/biliomi/clients/Viewers.client";
import { HostersClient } from "../../shared/modules/biliomi/clients/Hosters.client";

import "./NavChannelStatus.less";

@Component({
    selector: "nav-channel-info-component",
    templateUrl: require("./NavChannelStatus.template.html")
})
export class NavChannelStatusComponent {
    private channelInfoClient: ChannelStatusClient;
    private viewersClient: ViewersClient;
    private hostersClient: HostersClient;

    constructor(channelInfoClient: ChannelStatusClient,
                viewersClient: ViewersClient,
                hostersClient: HostersClient) {
        this.channelInfoClient = channelInfoClient;
        this.viewersClient = viewersClient;
        this.hostersClient = hostersClient;
    }
}
