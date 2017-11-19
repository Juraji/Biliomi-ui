import {EventEmitter, Injectable} from "@angular/core";
import {ConfigService} from "../../../services/Config.service";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {AuthService} from "../../../services/Auth.service";
import {Biliomi} from "../classes/interfaces/Biliomi";
import {IConfig} from "../../../classes/interfaces/IConfig.interface";
import ICommandRequest = Biliomi.ICommandRequest;

@Injectable()
export class BiliomiApiService {
  private _configService: ConfigService;
  private _httpClient: HttpClient;
  private _auth: AuthService;

  public postRequestInterceptor: EventEmitter<HttpResponse<any>>;

  constructor(configService: ConfigService, httpClient: HttpClient, auth: AuthService) {
    this._configService = configService;
    this._httpClient = httpClient;
    this._auth = auth;

    this.postRequestInterceptor = new EventEmitter<HttpResponse<any>>();
  }

  public async get<T>(resourceUri: string, params?: HttpParams): Promise<T> {
    let uri: string = await this.getApiUriFor(resourceUri);
    return this._httpClient.get<T>(uri, this.requestOptions(params)).toPromise();
  }

  public async post<T, R>(resourceUri: string, body: T, params?: HttpParams): Promise<R> {
    let uri: string = await this.getApiUriFor(resourceUri);
    return this._httpClient.post<R>(uri, BiliomiApiService.cleanBody(body), this.requestOptions(params)).toPromise();
  }

  public async put<T>(resourceUri: string, body: any, params?: HttpParams): Promise<T> {
    let uri: string = await this.getApiUriFor(resourceUri);
    return this._httpClient.put<T>(uri, BiliomiApiService.cleanBody(body), this.requestOptions(params)).toPromise();
  }

  // noinspection ReservedWordAsName
  public async delete(resourceUri: string, params?: HttpParams): Promise<void> {
    let uri: string = await this.getApiUriFor(resourceUri);
    return this._httpClient.delete<void>(uri, this.requestOptions(params)).toPromise();
  }

  public async postCommand(command: string, ...args: any[]): Promise<void> {
    let req: ICommandRequest = {Command: command + " " + args.join(" ")};
    let uri: string = await this.getApiUriFor("/events/commands/run");
    return this._httpClient.post<void>(uri, req, this.requestOptions()).toPromise();
  }

  private async getApiUriFor(resourceUri: string): Promise<string> {
    let settings: IConfig = await this._configService.getConfig();
    return settings.apiBase + resourceUri;
  }

  private requestOptions(params?: HttpParams) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this._auth.apiToken || ""
    });

    return {
      headers: headers,
      params: params
    };
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
