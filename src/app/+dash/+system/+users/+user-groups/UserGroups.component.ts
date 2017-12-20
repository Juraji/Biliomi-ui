import {Component, OnInit} from "@angular/core";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {UserGroupsClient} from "../../../../shared/modules/biliomi/clients/model/UserGroups.client";
import {XlsxExporter} from "../../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {XLSX_FORMATTER_BOOLEAN_YES_NO} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {MatDialog} from "@angular/material";
import {EditUserGroupModalComponent} from "./declarations/EditUserGroupModal.component";
import IUserGroup = Biliomi.IUserGroup;

@Component({
  selector: "user-groups",
  templateUrl: require("./UserGroups.template.pug")
})
export class UserGroupsComponent implements OnInit {
  private _dialog: MatDialog;
  private groupsDataSource: RestTableDataSource<IUserGroup> = new RestTableDataSource<IUserGroup>();

  constructor(userGroupsClient: UserGroupsClient, dialog: MatDialog) {
    this._dialog = dialog;
    this.groupsDataSource.bindClient(userGroupsClient);
    this.groupsDataSource.sortBuilder
      .add("DefaultGroup", true)
      .add("Weight", false);
  }

  public ngOnInit() {
    this.groupsDataSource.update();
  }

  public editGroup(group: IUserGroup) {
    if (group == null || !group.DefaultGroup) {
      let dialogRef = this._dialog.open(EditUserGroupModalComponent, {
        width: '600px',
        data: (group != null ? group.Id : null)
      });

      dialogRef.afterClosed()
        .filter((success: boolean) => success)
        .subscribe(() => this.groupsDataSource.update());
    }
  }

  public exportRecords() {
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - User Groups",
      sheetName: "User Groups",
      columns: [
        {objectPath: "$.Name", headerName: "Name"},
        {objectPath: "$.Weight", headerName: "Weight"},
        {objectPath: "$.DefaultGroup", headerName: "Is default group", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
        {objectPath: "$.LevelUpHours", headerName: "Hours for auto group assign"},
      ]
    };

    let exporter = new XlsxExporter(config);
    exporter.exportData(this.groupsDataSource.data);
  }
}
