import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {URI_TWITCH_CHANNEL, URI_TWITCH_PROFILE} from "../constants/Uris";
import {StringUtils} from "../modules/ts-utilities/StringUtils";

@Pipe({name: "twitchUserLink"})
export class TwitchUserLinkPipe implements PipeTransform {
  private _sanitizer: DomSanitizer;

  constructor(sanitizer: DomSanitizer) {
    this._sanitizer = sanitizer;
  }

  public transform(username: string, profile: boolean = false): SafeUrl {
    if (StringUtils.isEmpty(username)) return null;
    username = username.toLowerCase();
    return this._sanitizer.bypassSecurityTrustUrl(
      StringUtils.messageFormat((profile ? URI_TWITCH_PROFILE : URI_TWITCH_CHANNEL), username)
    );
  }
}
