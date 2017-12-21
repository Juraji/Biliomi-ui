import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {XlsxExporter} from "../../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {EditUserModalComponent} from "./declarations/EditUserModal.component";
import {MatDialog, MatPaginator} from "@angular/material";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO, XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {UsersClient} from "../../../../shared/modules/biliomi/clients/model/Users.client";
import {StringUtils} from "../../../../shared/modules/tools/StringUtils";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {PointsSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/PointsSettings.client";
import {ChannelInfoClient} from "../../../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
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
    this.dataSource.bindClient(usersClient);
    this.dataSource.sortBuilder.add("Username", false, true);
  }

  public async ngOnInit() {
    this._pointsSettingsClient.load();
    await this.dataSource.update();

    this._activatedRoute.paramMap.subscribe((map: ParamMap) => {
      if (map.has("username")) {
        let templateKey: string = map.get("username");
        let user: IUser = this.dataSource.data
          .filter((user: IUser) => StringUtils.equalsIgnoreCase(user.Username, templateKey))
          .pop();

        if (user != null) {
          this.editUser(user);
        }
      }
    });
  }

  public get tableColumns(): string[] {
    let columns: string[] = ['Username', 'UserGroup.Name', 'RecordedTime', 'Points', 'Follower', 'Edit'];

    if (this.channelInfoClient.Affiliate) {
      columns.splice(5, 0, 'Subscriber');
    }

    return columns;
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
}
