import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO, XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {UsersClient} from "../../../../shared/modules/biliomi/clients/model/Users.client";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {PointsSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/PointsSettings.client";
import {ChannelStatusClient} from "../../../../shared/modules/biliomi/clients/ChannelStatus.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {RouterUtils} from "../../../../shared/modules/tools/RouterUtils";
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/DataTable";
import IUser = Biliomi.IUser;
import {EditUserModalComponent} from "./edit-user-modal/EditUserModal.component";

@Component({
  selector: "user-overview",
  templateUrl: require("./UserOverview.template.pug")
})
export class UserOverviewComponent implements OnInit {
  private _dialog: MatDialog;
  private _pointsSettingsClient: PointsSettingsClient;
  private _activatedRoute: ActivatedRoute;
  private _router: Router;
  private channelInfoClient: ChannelStatusClient;
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
      {objectPath: "$.BlacklistedSince", headerName: "BlacklistedSince", formatter: XLSX_FORMATTER_DATE}
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "group": "UserGroup.Name",
    "recorded time": "RecordedTime",
    "follows": "Follower",
    "subscribed": "Subscriber"
  };

  constructor(usersClient: UsersClient,
              channelInfoClient: ChannelStatusClient,
              pointsSettingsClient: PointsSettingsClient,
              dialog: MatDialog,
              activatedRoute: ActivatedRoute,
              router: Router) {
    this._dialog = dialog;
    this._pointsSettingsClient = pointsSettingsClient;
    this.channelInfoClient = channelInfoClient;
    this._activatedRoute = activatedRoute;
    this._router = router;

    this._pointsSettingsClient.load();
    this.dataSource.client = usersClient;
  }

  public ngOnInit() {
    this._activatedRoute.paramMap.subscribe(async (map: ParamMap) => {
      if (map.has("username")) {
        let user: IUser = await (this.dataSource.client as UsersClient)
          .getUserByUsername(map.get("username"), false);
        if (user != null) {
          this.editUser(user);
        }
      }
    });
  }

  public editUser(user: IUser) {
    let dialogRef = this._dialog.open(EditUserModalComponent, {
      width: "600px",
      height: "710px",
      data: user.Id
    });

    dialogRef.afterClosed()
      .filter((changesMade: boolean) => changesMade)
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
