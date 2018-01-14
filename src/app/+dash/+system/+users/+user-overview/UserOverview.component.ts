import {Component} from "@angular/core";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO, XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {UsersClient} from "../../../../shared/modules/biliomi/clients/model/Users.client";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {PointsSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/PointsSettings.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/DataTable";
import IUser = Biliomi.IUser;

@Component({
  selector: "user-overview",
  templateUrl: require("./UserOverview.template.pug")
})
export class UserOverviewComponent {
  private _pointsSettingsClient: PointsSettingsClient;
  private dataSource: RestTableDataSource<IUser> = new RestTableDataSource<IUser>();

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Users",
    sheetName: "Users",
    columns: [
      {objectPath: "$.Username", headerName: "Username"},
      {objectPath: "$.DisplayName", headerName: "Display Name"},
      {objectPath: "$.UserGroup.Name", headerName: "User Group"},
      {objectPath: "$.Title", headerName: "Title"},
      {objectPath: "$.RecordedTime", headerName: "Recorded Time", formatter: XLSX_FORMATTER_RELATIVE_TIME},
      {objectPath: "$.Points", headerName: () => this._pointsSettingsClient.PointsNamePlural},
      {objectPath: "$.Caster", headerName: "Caster", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.Moderator", headerName: "Moderator", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.Follower", headerName: "Follower", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.FollowDate", headerName: "FollowDate", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.Subscriber", headerName: "Subscriber", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.SubscribeDate", headerName: "SubscribeDate", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.BlacklistedSince", headerName: "BlacklistedSince", formatter: XLSX_FORMATTER_DATE}
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "group": "UserGroup.Name",
    "recorded time": "RecordedTime",
    "follows": "Follower",
    "subscribed": "Subscriber"
  };

  constructor(usersClient: UsersClient) {
    this.dataSource.client = usersClient;
  }

  // noinspection JSMethodCanBeStatic
  public getUsernameColorClass(user: IUser): string {
    if (user != null) {
      if (user.BlacklistedSince != null) {
        return "text-not-ok";
      } else if (user.Caster) {
        return "text-primary";
      } else if (user.Moderator) {
        return "text-secondary";
      }
    }

    return "";
  }
}
