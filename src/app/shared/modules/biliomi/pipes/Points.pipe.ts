import {Pipe, PipeTransform} from "@angular/core";
import {PointsSettingsClient} from "../clients/settings/PointsSettings.client";

@Pipe({name: "points"})
export class PointsPipe implements PipeTransform {
  private _pointsSettingsClient: PointsSettingsClient;

  constructor(pointsSettingsClient: PointsSettingsClient) {
    this._pointsSettingsClient = pointsSettingsClient;
  }

  public async transform(value?: number): Promise<string> {
    await this._pointsSettingsClient.load();
    if (value == null) {
      return this._pointsSettingsClient.PointsNamePlural;
    } else {
      return this._pointsSettingsClient.appendPointsName(value);
    }
  }
}
