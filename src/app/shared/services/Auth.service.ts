import {Injectable} from "@angular/core";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {IJwtBody} from "../modules/biliomi/classes/interfaces/JWT";
import moment = require("moment");
import ITokenUserType = Biliomi.ITokenUserType;

const STORAGE_KEY_API_TOKEN: string = "biliomi-ui:api-token";

@Injectable()
export class AuthService {
  private _token: string;
  private _username: string;
  private _channelName: string;
  private _tokenExpiryTime: moment.Moment;
  private _userType: ITokenUserType;

  constructor() {
    this.apiToken = localStorage.getItem(STORAGE_KEY_API_TOKEN);
  }

  public get username(): string {
    return this._username;
  }

  public get channelName(): string {
    return this._channelName;
  }

  public get tokenExpiryTime(): moment.Moment {
    return this._tokenExpiryTime;
  }

  public get userType(): Biliomi.ITokenUserType {
    return this._userType;
  }

  public get isTokenValid(): boolean {
    return this._tokenExpiryTime != null && moment().isBefore(this._tokenExpiryTime);
  }

  public get apiToken(): string {
    return this._token;
  }

  public set apiToken(token: string) {
    if (token != null) {
      let tokenBody: IJwtBody = AuthService.decodeJwt(token);
      if (tokenBody != null) {
        localStorage.setItem(STORAGE_KEY_API_TOKEN, token);
        this._token = token;
        this._username = tokenBody.sub;
        this._channelName = tokenBody.chn;
        this._tokenExpiryTime = moment.unix(tokenBody.exp);
        this._userType = tokenBody.utp;
      }
    }
  }

  public logout() {
    this._username = null;
    this._channelName = null;
    this._tokenExpiryTime = null;
    localStorage.removeItem(STORAGE_KEY_API_TOKEN);
    location.reload(true);
  }

  private static decodeJwt(token: string): IJwtBody {
    if (token == null) {
      return null;
    }

    let parts: string[] = token.split(".");
    if (parts.length != 3) {
      throw new Error("JWT must have 3 parts")
    }

    let decoded: string = atob(parts[1]);
    if (decoded == null) {
      throw new Error("Cannot decode JWT");
    }

    return JSON.parse(decoded);
  }
}
