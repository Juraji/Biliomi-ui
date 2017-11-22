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

  /**
   * Perform a GET request on Biliomi's Api to retrieve (lists of) entities.
   * @param {string} resourceUri The entity resource uri, without api prefix. E.g. "/core/games" or "/core/games/1".
   * @param {HttpParams} params Any query parameters to send with the request.
   * @return {Promise<T>} A promise to the result.
   * The promise could resolve with NULL of there was no content or an error occurred.
   */
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

  /**
   * Perform a POST request on Biliomi's Api in order to create new entities or perform actions.
   * @param {string} resourceUri The resource uri, without api prefix. E.g. "/auth/login".
   * @param {T} body The object representing the body of the request.
   * @param {HttpParams} params Any query parameters to send with the request.
   * @return {Promise<R>} A promise to the result.
   * The promise could resolve with NULL of there was no content or an error occurred.
   */
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

  /**
   * Perform a PUT request on Biliomi's Api in order to update entities.
   * @param {string} resourceUri The resource uri of the target entity, without api prefix. E.g. "/core/games/1".
   * @param body The object representing the updated entity
   * @param {HttpParams} params Any query parameters to send with the request.
   * @return {Promise<T>} A promise to the persisted entity.
   * The promise could resolve with NULL of there was no change comitted or an error occurred.
   */
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
  /**
   * Perform a DELETE request on Biliomi's Api in order to delete entities.
   * @param {string} resourceUri The resource uri of the target entity, without api prefix. E.g. "/core/games/1".
   * @param {HttpParams} params params Any query parameters to send with the request.
   * @return {Promise<boolean>} A promise to the success state, being True when successful and False when failed.
   */
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

  /**
   * Have Biliomi execute a command as if it were posted in the chat.
   * @param {string} command The command to execute.
   * @param args Any parameters to apply with the command
   * @return {Promise<boolean>} A promise to the success state of the request, being True when successful and False when failed.
   * The promise resulting in true does NOT guarantee a successful command execution!
   */
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

  /**
   * Have Biliomi execute a cli command as if it were posted in the console.
   * @param {string} command The command to execute.
   * @param args Any parameters to apply with the command
   * @return {Promise<boolean>} A promise to the success state of the request, being True when successful and False when failed.
   * The promise resulting in true does NOT guarantee a successful command execution!
   */
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

  /**
   * Subscribe to any error event that occurs while comunicating with Biliomi.
   * Do note that a subscriber of this emitter will get executed with every and all errors.
   * @return {EventEmitter<HttpErrorResponse>}
   */
  public get postRequestErrorInterceptor(): EventEmitter<HttpErrorResponse> {
    return this._postRequestErrorInterceptor;
  }

  private async getApiUriFor(resourceUri: string): Promise<string> {
    let settings: IConfig = await this._configService.getConfig();
    return settings.apiBase + BILIOMI_API.API_URI_PREFIX + resourceUri;
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
