import {EventEmitter, Injectable} from "@angular/core";
import {ConfigService} from "../../../services/Config.service";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {AuthService} from "../../../services/Auth.service";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {IConfig} from "../../../classes/interfaces/IConfig.interface";
import ICommandRequest = Biliomi.ICommandRequest;
import {BILIOMI_API} from "../constants/BiliomiApiVariables";

@Injectable()
export class BiliomiApiService {
  private _configService: ConfigService;
  private _httpClient: HttpClient;
  private _auth: AuthService;
  private _postRequestErrorInterceptor: EventEmitter<HttpErrorResponse>;

  constructor(configService: ConfigService, httpClient: HttpClient, auth: AuthService) {
    this._configService = configService;
    this._httpClient = httpClient;
    this._auth = auth;

    this._postRequestErrorInterceptor = new EventEmitter<HttpErrorResponse>();
  }

  public get postRequestErrorInterceptor(): EventEmitter<HttpErrorResponse> {
    return this._postRequestErrorInterceptor;
  }

  public async get<T>(resourceUri: string, params?: HttpParams): Promise<T> {
    let uri: string = await this.getApiUriFor(resourceUri);

    try {
      return await this._httpClient
        .get<T>(uri, {
          headers: this.buildHeaders(),
          params: params
        })
        .toPromise();
    } catch (e) {
      this._postRequestErrorInterceptor.emit(e);
    }

    return null;
  }

  public async post<T, R>(resourceUri: string, body: T, params?: HttpParams): Promise<R> {
    let uri: string = await this.getApiUriFor(resourceUri);

    try {
      return await this._httpClient
        .post<R>(uri, BiliomiApiService.cleanBody(body), {
          headers: this.buildHeaders(),
          params: params
        })
        .toPromise();
    } catch (e) {
      this._postRequestErrorInterceptor.emit(e);
    }

    return null;
  }

  public async put<T>(resourceUri: string, body: any, params?: HttpParams): Promise<T> {
    let uri: string = await this.getApiUriFor(resourceUri);

    try {
      return await this._httpClient
        .put<T>(uri, BiliomiApiService.cleanBody(body), {
          headers: this.buildHeaders(),
          params: params
        })
        .toPromise();
    } catch (e) {
      this._postRequestErrorInterceptor.emit(e);
    }

    return null;
  }

  // noinspection ReservedWordAsName
  public async delete(resourceUri: string, params?: HttpParams): Promise<boolean> {
    let uri: string = await this.getApiUriFor(resourceUri);
    let response: HttpResponse<void>;

    try {
      response = await this._httpClient
        .delete<void>(uri, {
          headers: this.buildHeaders(),
          params: params,
          observe: "response"
        })
        .toPromise();
    } catch (e) {
      this._postRequestErrorInterceptor.emit(e);
    }

    return response != null && response.status == 200;
  }

  public async postCommand(command: string, ...args: any[]): Promise<boolean> {
    let req: ICommandRequest = {Command: command + " " + args.join(" ")};
    let uri: string = await this.getApiUriFor(BILIOMI_API.COMMAND_ENDPOINT);
    let response: HttpResponse<void>;

    try {
      response = await this._httpClient
        .post<void>(uri, req, {
          headers: this.buildHeaders(),
          observe: "response"
        })
        .toPromise();
    } catch (e) {
      this._postRequestErrorInterceptor.emit(e);
    }

    return response != null && response.status == 200;
  }

  public async postCliCommand(command: string, ...args: any[]): Promise<boolean> {
    let req: ICommandRequest = {Command: command + " " + args.join(" ")};
    let uri: string = await this.getApiUriFor(BILIOMI_API.CLI_COMMAND_ENDPOINT);
    let response: HttpResponse<void>;

    try {
      response = await this._httpClient
        .post<void>(uri, req, {
          headers: this.buildHeaders(),
          observe: "response"
        })
        .toPromise();
    } catch (e) {
      this._postRequestErrorInterceptor.emit(e);
    }

    return response != null && response.status == 200;
  }

  private async getApiUriFor(resourceUri: string): Promise<string> {
    let settings: IConfig = await this._configService.getConfig();
    return settings.apiBase + BILIOMI_API.API_SUFFIX + resourceUri;
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this._auth.apiToken || "");
  }

  private static cleanBody(body: any): any {
    let cleanBody: { [key: string]: any } = {};

    for (let key in body) {
      if (body.hasOwnProperty(key) && !key.startsWith("_")) {
        cleanBody[key] = body[key];
      }
    }

    return JSON.stringify(cleanBody);
  }
}
