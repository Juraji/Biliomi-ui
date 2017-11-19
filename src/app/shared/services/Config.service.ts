import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IConfig} from "../classes/interfaces/IConfig.interface";
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

      let config: IConfig = jsyaml.load(response);
      this._cache = config;
    }

    return this._cache;
  }
}
