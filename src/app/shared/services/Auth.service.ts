import {Injectable} from "@angular/core";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {IJwtBody} from "../modules/biliomi/classes/interfaces/JWT";
import {Storage} from "../classes/Storage";
import moment = require("moment");
import ITokenUserType = Biliomi.ITokenUserType;

const STORAGE_KEY_AUTH_TOKEN: string = "api.authorizationToken";
const STORAGE_KEY_REFRESH_TOKEN: string = "api.refreshToken";

@Injectable()
export class AuthService {
  private _authorizationToken: string;
  private _username: string;
  private _channelName: string;
  private _authTokenExpiryTime: moment.Moment;
  private _refreshTokenExpiryTime: moment.Moment;
  private _userType: ITokenUserType;

  constructor() {
    this.authorizationToken = Storage.get(STORAGE_KEY_AUTH_TOKEN);
    this.refreshToken = this.refreshToken;
  }

  public get username(): string {
    return this._username;
  }

  public get channelName(): string {
    return this._channelName;
  }

  public get userType(): Biliomi.ITokenUserType {
    return this._userType;
  }

  public get authorizationToken(): string {
    return this._authorizationToken;
  }

  public set authorizationToken(token: string) {
    if (token != null) {
      let tokenBody: IJwtBody = AuthService.decodeJwt(token);
      if (tokenBody != null) {
        Storage.store(STORAGE_KEY_AUTH_TOKEN, token);
        this._authorizationToken = token;
        this._username = tokenBody.usr;
        this._channelName = tokenBody.chn;
        this._authTokenExpiryTime = moment.unix(tokenBody.exp);
        this._userType = tokenBody.utp;
      }
    }
  }

  public get isTokenViable(): boolean {
    return this.authorizationToken != null
      && this.refreshToken != null
      && moment().isBefore(this._refreshTokenExpiryTime);
  }

  public get isTokenExpired(): boolean {
    return this._authTokenExpiryTime == null || moment().isAfter(this._authTokenExpiryTime);
  }

  // noinspection JSMethodCanBeStatic
  public get refreshToken(): string {
    return Storage.get(STORAGE_KEY_REFRESH_TOKEN);
  }

  // noinspection JSMethodCanBeStatic
  public set refreshToken(token: string) {
    if (token != null) {
      let tokenBody: IJwtBody = AuthService.decodeJwt(token);
      if (tokenBody != null) {
        this._refreshTokenExpiryTime = moment.unix(tokenBody.exp);
        Storage.store(STORAGE_KEY_REFRESH_TOKEN, token);
      }
    }
  }

  public logout() {
    this._username = null;
    this._channelName = null;
    this._authTokenExpiryTime = null;
    this._refreshTokenExpiryTime = null;
    Storage.unset(STORAGE_KEY_AUTH_TOKEN);
    Storage.unset(STORAGE_KEY_REFRESH_TOKEN);
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
