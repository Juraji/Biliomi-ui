import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {StringUtils} from "../modules/ts-utilities/StringUtils";
import {TWITCH_URIS} from "../classes/constants/Uris";

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
      StringUtils.messageFormat((profile ? TWITCH_URIS.PROFILE : TWITCH_URIS.CHANNEL), username)
    );
  }
}
