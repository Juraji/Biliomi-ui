import {Pipe, PipeTransform} from "@angular/core";
import {PointsSettingsClient} from "../clients/settings/PointsSettings.client";
import {DecimalPipe} from "@angular/common";

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
      let formatted: string = (new DecimalPipe("nl-NL"))
        .transform(value, "1.0-0");
      return `${formatted} ${this._pointsSettingsClient.PointsNamePlural}`;
    }
  }
}
