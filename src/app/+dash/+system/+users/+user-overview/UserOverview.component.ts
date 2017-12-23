import {Component, OnInit} from "@angular/core";
import {EditUserModalComponent} from "./declarations/EditUserModal.component";
import {MatDialog} from "@angular/material";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO, XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {UsersClient} from "../../../../shared/modules/biliomi/clients/model/Users.client";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {PointsSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/PointsSettings.client";
import {ChannelInfoClient} from "../../../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/TableFilterMapping.interface";
import IUser = Biliomi.IUser;

@Component({
  selector: "user-overview",
  templateUrl: require("./UserOverview.template.pug")
})
export class UserOverviewComponent implements OnInit {
  private _dialog: MatDialog;
  private _pointsSettingsClient: PointsSettingsClient;
  private _activatedRoute: ActivatedRoute;
  private channelInfoClient: ChannelInfoClient;
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
      {
        objectPath: "$.Points",
        headerName: () => this._pointsSettingsClient.PointsNamePlural,
        formatter: (points: number) => this._pointsSettingsClient.appendPointsName(points)
      },
      {objectPath: "$.Caster", headerName: "Caster", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.Moderator", headerName: "Moderator", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.Follower", headerName: "Follower", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.FollowDate", headerName: "FollowDate", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.Subscriber", headerName: "Subscriber", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {objectPath: "$.SubscribeDate", headerName: "SubscribeDate", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.BlacklistedSince", headerName: "BlacklistedSince", formatter: XLSX_FORMATTER_DATE},
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "group": "UserGroup.Name",
    "recorded time": "RecordedTime",
    "follows": "Follower",
    "subscribed": "Subscriber",
  };

  constructor(usersClient: UsersClient,
              channelInfoClient: ChannelInfoClient,
              pointsSettingsClient: PointsSettingsClient,
              dialog: MatDialog,
              activatedRoute: ActivatedRoute) {
    this._dialog = dialog;
    this._pointsSettingsClient = pointsSettingsClient;
    this.channelInfoClient = channelInfoClient;
    this._activatedRoute = activatedRoute;

    this.channelInfoClient.load();
    this.dataSource.client = usersClient;
  }

  public ngOnInit() {
    this._pointsSettingsClient.load();

    this._activatedRoute.paramMap.subscribe(async (map: ParamMap) => {
      if (map.has("username")) {
        let user: IUser = await (this.dataSource.client as UsersClient).getUserByUsername(map.get("username"), false);
        if (user != null) {
          this.editUser(user);
        }
      }
    });
  }

  public editUser(user: IUser) {
    let dialogRef = this._dialog.open(EditUserModalComponent, {
      width: '600px',
      data: user.Id
    });

    dialogRef.afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.dataSource.update());
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
