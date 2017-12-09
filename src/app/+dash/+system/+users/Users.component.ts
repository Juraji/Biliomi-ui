import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {UsersClient} from "../../../shared/modules/biliomi/clients/model/Users.client";
import {MatDialog, MatPaginator} from "@angular/material";
import {RestMatDataSource} from "../../../shared/modules/ng-material/classes/RestMatDataSource.class";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_DATE,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {PointsSettingsClient} from "../../../shared/modules/biliomi/clients/settings/PointsSettings.client";
import {EditUserModalComponent} from "./declarations/EditUserModal.component";
import {ChannelInfoClient} from "../../../shared/modules/biliomi/clients/settings/ChannelInfo.client";
import IUser = Biliomi.IUser;
import {StringUtils} from "../../../shared/modules/tools/StringUtils";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DataSourceFilterComponent} from "../../../shared/modules/ng-material/components/DataSourceFilter.component";

@Component({
  selector: "users-page",
  templateUrl: require("./Users.template.pug")
})
export class UsersComponent implements AfterViewInit {
  private _dialog: MatDialog;
  private _pointsSettingsClient: PointsSettingsClient;
  private _activatedRoute: ActivatedRoute;
  private channelInfoClient: ChannelInfoClient;
  private dataSource: RestMatDataSource<IUser> = new RestMatDataSource<IUser>();

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;

  @ViewChild("datasourceFilter", {read: DataSourceFilterComponent})
  private filterField: DataSourceFilterComponent;

  constructor(usersClient: UsersClient,
              channelInfoClient: ChannelInfoClient,
              pointsSettingsClient: PointsSettingsClient,
              dialog: MatDialog,
              activatedRoute:ActivatedRoute) {
    this._dialog = dialog;
    this._pointsSettingsClient = pointsSettingsClient;
    this.channelInfoClient = channelInfoClient;
    this._activatedRoute = activatedRoute;

    this.channelInfoClient.load();
    this.dataSource.bindClient(usersClient);
    this.dataSource.sortBuilder.add("Username", false, true);
  }

  public async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    await this.dataSource.update();

    this._activatedRoute.paramMap.subscribe((map: ParamMap) => {
      if (map.has("username")) {
        let templateKey: string = map.get("username");
        let user: IUser = this.dataSource.data
          .filter((user: IUser) => StringUtils.equalsIgnoreCase(user.Username, templateKey))
          .pop();

        if (user != null) {
          this.editUser(user);
          this.filterField.value = user.DisplayName;
        }
      }
    });
  }

  private get tableColumns(): string[] {
    let columns: string[] = ['Username', 'UserGroup.Name', 'RecordedTime', 'Points', 'Follower', 'Edit'];

    if (this.channelInfoClient.Affiliate) {
      columns.splice(5, 0, 'Subscriber');
    }

    return columns;
  }

  private applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  private editUser(user: IUser) {
    let dialogRef = this._dialog.open(EditUserModalComponent, {
      width: '600px',
      data: user.Id
    });

    dialogRef.afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.dataSource.update());
  }

  private exportUsers() {
    this._pointsSettingsClient.load();
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - Users",
      sheetName: "Users",
      columns: [
        {objectPath: "$.Username", headerName: "Username"},
        {objectPath: "$.DisplayName", headerName: "DisplayName"},
        {objectPath: "$.UserGroup.Name", headerName: "UserGroup"},
        {objectPath: "$.Title", headerName: "Title"},
        {objectPath: "$.RecordedTime", headerName: "RecordedTime", formatter: XLSX_FORMATTER_RELATIVE_TIME},
        {
          objectPath: "$.Points",
          headerName: this._pointsSettingsClient.PointsNamePlural,
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
    let exporter = new XlsxExporter(config);
    exporter.exportData(this.dataSource.data);
  }
}
