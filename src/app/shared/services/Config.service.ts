import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IConfig} from "../classes/interfaces/IConfig.interface";

@Injectable()
export class ConfigService {
  private static SETTINGS_FILE: string = "config.yaml";

  private _client: HttpClient;
  private _cache: IConfig;

  constructor(client: HttpClient) {
    this._client = client;
  }

  public async getConfig(): Promise<IConfig> {
    // Async with subscribe?
    if (this._cache == null) {
      let response: IConfig = await this._client.get<IConfig>(ConfigService.SETTINGS_FILE).toPromise();

      if (response == null) {
        throw new Error("Unable to load config.yaml");
      }

      this._cache = response;
    }

    return this._cache;
  }
}
