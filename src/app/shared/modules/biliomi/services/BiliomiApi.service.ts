import { EventEmitter, Injectable } from "@angular/core";
import { AuthService } from "../../../services/Auth.service";
import { Biliomi } from "../classes/interfaces/Biliomi";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import ICommandRequest = Biliomi.ICommandRequest;
import ITokenRequest = Biliomi.IRestRefreshTokenRequest;
import ITokenResponse = Biliomi.IRestAuthorizationResponse;

@Injectable()
export class BiliomiApiService {
    private _httpClient: HttpClient;
    private _auth: AuthService;

    constructor(httpClient: HttpClient, auth: AuthService) {
        this._httpClient = httpClient;
        this._auth = auth;

        this._postRequestErrorInterceptor = new EventEmitter<HttpErrorResponse>();
    }

    private _postRequestErrorInterceptor: EventEmitter<HttpErrorResponse>;

    /**
     * Subscribe to any error event that occurs while comunicating with Biliomi.
     * Do note that a subscriber of this emitter will get executed with every and all errors.
     * @return {EventEmitter<HttpErrorResponse>}
     */
    public get postRequestErrorInterceptor(): EventEmitter<HttpErrorResponse> {
        return this._postRequestErrorInterceptor;
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

    private static mapToHttpParams(map: Map<string, any>): HttpParams {
        let params: HttpParams;

        if (map != null) {
            let entries = map.keys();
            params = new HttpParams();
            let e: IteratorResult<string>;

            while (!(e = entries.next()).done) {
                params = params.set(e.value, map.get(e.value));
            }

        }

        return params;
    }

    /**
     * Perform a GET request on Biliomi's Api to retrieve (lists of) entities.
     * @param {string} resourceUri The entity resource uri, without api prefix. E.g. "/core/games" or "/core/games/1".
     * @param {Map<string, Object>} params Any query parameters to send with the request.
     * @return {Promise<T>} A promise to the result.
     * The promise could resolve with NULL of there was no content or an error occurred.
     */
    public async get<T>(resourceUri: string, params?: Map<string, any>): Promise<T> {
        let uri: string = BiliomiApiService.getApiUriFor(resourceUri);

        try {
            return await this._httpClient
                .get<T>(uri, {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": await this.getAuthorizationToken()
                    }),
                    params: BiliomiApiService.mapToHttpParams(params)
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
     * @param {Map<string, Object>} params Any query parameters to send with the request.
     * @return {Promise<R>} A promise to the result.
     * The promise could resolve with NULL of there was no content or an error occurred.
     */
    public async post<T, R>(resourceUri: string, body: T, params?: Map<string, any>): Promise<R> {
        let uri: string = BiliomiApiService.getApiUriFor(resourceUri);

        try {
            return await this._httpClient
                .post<R>(uri, BiliomiApiService.cleanBody(body), {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": await this.getAuthorizationToken()
                    }),
                    params: BiliomiApiService.mapToHttpParams(params)
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
     * @param {Map<string, Object>} params Any query parameters to send with the request.
     * @return {Promise<R>} A promise to the result.
     * The promise could resolve with NULL of there was no content or an error occurred.
     */
    public async postUnauthorized<T, R>(resourceUri: string, body: T, params?: Map<string, any>): Promise<R> {
        let uri: string = BiliomiApiService.getApiUriFor(resourceUri);

        try {
            return await this._httpClient
                .post<R>(uri, BiliomiApiService.cleanBody(body), {
                    headers: new HttpHeaders({"Content-Type": "application/json"}),
                    params: BiliomiApiService.mapToHttpParams(params)
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
     * @param {Map<string, Object>} params Any query parameters to send with the request.
     * @return {Promise<T>} A promise to the persisted entity.
     * The promise could resolve with NULL of there was no change comitted or an error occurred.
     */
    public async put<T>(resourceUri: string, body: any, params?: Map<string, any>): Promise<T> {
        let uri: string = BiliomiApiService.getApiUriFor(resourceUri);

        try {
            return await this._httpClient
                .put<T>(uri, BiliomiApiService.cleanBody(body), {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": await this.getAuthorizationToken()
                    }),
                    params: BiliomiApiService.mapToHttpParams(params)
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
     * @param {Map<string, Object>} params params Any query parameters to send with the request.
     * @return {Promise<boolean>} A promise to the success state, being True when successful and False when failed.
     */
    public async delete(resourceUri: string, params?: Map<string, any>): Promise<boolean> {
        let uri: string = BiliomiApiService.getApiUriFor(resourceUri);
        let response: HttpResponse<any>;

        try {
            response = await this._httpClient
                .delete(uri, {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": await this.getAuthorizationToken()
                    }),
                    params: BiliomiApiService.mapToHttpParams(params),
                    observe: "response",
                    responseType: "text"
                })
                .toPromise();
        } catch (e) {
            this._postRequestErrorInterceptor.emit(e);
        }

        return response != null && response.status === 200;
    }

    /**
     * Have Biliomi execute a command as if it were posted in the chat.
     * @param {string} command The command to execute.
     * @param args Any parameters to apply with the command
     * @return {Promise<boolean>} A promise to the success state of the request, being True when successful and False when failed.
     * The promise resulting in true does NOT guarantee a successful command execution!
     */
    public async postCommand(command: string, ...args: any[]): Promise<boolean> {
        let req: ICommandRequest = {Command: `${command} ${args.join(" ")}`};
        let uri: string = BiliomiApiService.getApiUriFor("/events/commands/run");
        let response: HttpResponse<string>;

        try {
            response = await this._httpClient
                .post(uri, req, {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": await this.getAuthorizationToken()
                    }),
                    observe: "response",
                    responseType: "text"
                })
                .toPromise();
        } catch (e) {
            this._postRequestErrorInterceptor.emit(e);
        }

        return response != null && response.status === 200;
    }

    /**
     * Have Biliomi execute a cli command as if it were posted in the console.
     * @param {string} command The command to execute.
     * @param args Any parameters to apply with the command
     * @return {Promise<boolean>} A promise to the success state of the request, being True when successful and False when failed.
     * The promise resulting in true does NOT guarantee a successful command execution!
     */
    public async postCliCommand(command: string, ...args: any[]): Promise<boolean> {
        let req: ICommandRequest = {Command: `${command} ${args.join(" ")}`};
        let uri: string = BiliomiApiService.getApiUriFor("/events/commands/cli/run");
        let response: HttpResponse<string>;

        try {
            response = await this._httpClient
                .post(uri, req, {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": await this.getAuthorizationToken()
                    }),
                    observe: "response",
                    responseType: "text"
                })
                .toPromise();
        } catch (e) {
            this._postRequestErrorInterceptor.emit(e);
        }

        return response != null && response.status === 200;
    }

    /**
     * Get a valid authorization token.
     * Note: Logs out when authorization token can not be refreshed!!!
     * @returns {Promise<string>}
     */
    public async getAuthorizationToken(): Promise<string> {
        if (this._auth.isTokenExpired) {
            let refreshRequest: ITokenRequest = {RefreshToken: this._auth.refreshToken};
            let response: ITokenResponse = await this.postUnauthorized<ITokenRequest, ITokenResponse>("/auth/refresh", refreshRequest);

            if (response != null && response.Message === "Login OK") {
                this._auth.authorizationToken = response.AuthorizationToken;
                this._auth.refreshToken = response.RefreshToken;

                return response.AuthorizationToken;
            } else {
                this._auth.logout();
                throw new Error("Unable to refresh authorization");
            }
        } else {
            return this._auth.authorizationToken;
        }
    }

    /**
     * Get the api base uri for Biliomi
     * @param {string} resourceUri
     * @returns {Promise<string>}
     */
    public static getApiUriFor(resourceUri: string): string {
        return `${PANEL_CONFIG.apiBase}/api${resourceUri}`;
    }
}
