import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as jsyaml from "js-yaml";

@Injectable()
export class ConfigService {
  private static SETTINGS_FILE: string = "config.yml";

  private _client: HttpClient;
  private _cache: IConfig;

  constructor(client: HttpClient) {
    this._client = client;
  }

  public async getConfig(): Promise<IConfig> {
    if (this._cache == null) {
      let response: string = await this._client.get(ConfigService.SETTINGS_FILE, {responseType: "text"}).toPromise();

      if (response == null) {
        throw new Error("Unable to load config.yaml");
      }

      this._cache = jsyaml.load(response);
    }

    return this._cache;
  }
}
