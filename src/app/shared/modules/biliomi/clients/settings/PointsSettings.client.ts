import {Injectable} from "@angular/core";
import {SettingsRestClient} from "../../classes/SettingsRestClient";
import {Biliomi} from "../../classes/interfaces/Biliomi";
import IPointsSettings = Biliomi.IPointsSettings;
import {BiliomiApiService} from "../../services/BiliomiApi.service";
import {NumberUtils} from "../../../ts-utilities/NumberUtils";

@Injectable()
export class PointsSettingsClient extends SettingsRestClient<IPointsSettings> implements IPointsSettings {
  public PointsNameSingular: string;
  public PointsNamePlural: string;
  public TrackOnline: boolean;
  public TrackOffline: boolean;
  public OnlinePayoutInterval: number;
  public OfflinePayoutInterval: number;
  public OnlinePayoutAmount: number;
  public OfflinePayoutAmount: number;
  public Type: string;

  constructor(api: BiliomiApiService) {
    super(api, "/core/settings/points");
  }

  public appendPointsName(points: number): string {
    if (NumberUtils.isPlural(points)) {
      return points + " " + this.PointsNamePlural;
    } else {
      return points + " " + this.PointsNameSingular;
    }
  }
}
