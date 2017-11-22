import {Component, OnInit} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AuthService} from "../../shared/services/Auth.service";
import {StringUtils} from "../../shared/modules/ts-utilities/StringUtils";
import {TWITCH_URIS} from "../../shared/constants/Uris";

@Component({
  selector: "chat-component",
  templateUrl: require("./Chat.template.pug"),
  styleUrls: [require("./Chat.less").toString()]
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
