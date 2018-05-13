import { Component } from "@angular/core";
import { RestTableDataSource } from "../../../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { UserGroupsClient } from "../../../../../shared/modules/biliomi/clients/model/UserGroups.client";
import { IXlsxExportConfig } from "../../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import { XLSX_FORMATTER_BOOLEAN_YES_NO } from "../../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import { EditUserGroupModalComponent } from "./EditUserGroupModal.component";
import { TableFilterNameMapping } from "../../../../../shared/modules/data-table/classes/interfaces/DataTable";
import { DialogsService } from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import { filter } from "rxjs/operators";
import IUserGroup = Biliomi.IUserGroup;

@Component({
    selector: "user-groups",
    templateUrl: require("./UserGroups.template.html")
})
export class UserGroupsComponent {
    public exportConfig: IXlsxExportConfig = {
        fileName: "Biliomi - User Groups",
        sheetName: "User Groups",
        columns: [
            {objectPath: "$.Name", headerName: "Name"},
            {objectPath: "$.Weight", headerName: "Weight"},
            {objectPath: "$.DefaultGroup", headerName: "Is default group", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
            {objectPath: "$.LevelUpHours", headerName: "Hours for auto group assign"}
        ]
    };
    public tableFilterMapping: TableFilterNameMapping = {
        "default": "DefaultGroup",
        "Level Up Hours": "LevelUpHours"
    };
    private _dialog: DialogsService;
    private groupsDataSource: RestTableDataSource<IUserGroup> = new RestTableDataSource<IUserGroup>();

    constructor(userGroupsClient: UserGroupsClient, dialog: DialogsService) {
        this._dialog = dialog;
        this.groupsDataSource.client = userGroupsClient;
    }

    public editGroup(group: IUserGroup) {
        if (group == null || !group.DefaultGroup) {
            let dialogRef = this._dialog.open(EditUserGroupModalComponent, {
                width: "600px",
                data: (group != null ? group.Id : null)
            });

            let sub = dialogRef.afterClosed()
                .pipe(filter((success: boolean) => success))
                .subscribe(() => {
                    this.groupsDataSource.update();
                    sub.unsubscribe();
                });
        }
    }
}
