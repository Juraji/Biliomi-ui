import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AuthService } from "../../shared/services/Auth.service";
import { StringUtils } from "../../shared/modules/tools/StringUtils";
import { TWITCH_URIS } from "../../shared/classes/constants/Uris";

import "./Chat.less";

@Component({
    selector: "chat-component",
    templateUrl: require("./Chat.template.html")
})
export class ChatComponent implements OnInit {
    private _auth: AuthService;
    private _sanitizer: DomSanitizer;
    private chatUri: SafeResourceUrl;

    constructor(auth: AuthService, sanitizer: DomSanitizer) {
        this._auth = auth;
        this._sanitizer = sanitizer;
    }

    public ngOnInit() {
        let uri: string = StringUtils.messageFormat(TWITCH_URIS.CHAT, this._auth.channelName.toLowerCase());
        this.chatUri = this._sanitizer.bypassSecurityTrustResourceUrl(uri);
    }
}
