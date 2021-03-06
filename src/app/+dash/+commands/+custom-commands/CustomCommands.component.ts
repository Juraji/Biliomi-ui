import { Component, OnInit } from "@angular/core";
import { Biliomi } from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { CustomCommandsClient } from "../../../shared/modules/biliomi/clients/model/CustomCommands.client";
import { RestTableDataSource } from "../../../shared/modules/data-table/classes/RestTableDataSource";
import { ARG_COMMAND_REPLACEMENTS } from "../../../shared/modules/biliomi/classes/constants/CommandReplacements";
import { EditCustomCommandModalComponent } from "./declarations/EditCustomCommandModal.component";
import { IXlsxExportConfig } from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {
    XLSX_FORMATTER_LIST_JOIN,
    XLSX_FORMATTER_RELATIVE_TIME
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import { TableFilterNameMapping } from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import { DialogsService } from "../../../shared/modules/dialogs/services/Dialogs.service";
import { filter } from "rxjs/operators";
import ICustomCommand = Biliomi.ICustomCommand;

@Component({
    selector: "custom-commands-component",
    templateUrl: require("./CustomCommands.template.html")
})
export class CustomCommandsComponent implements OnInit {
    public exportConfig: IXlsxExportConfig = {
        fileName: "Biliomi - Custom commands",
        sheetName: "Custom commands",
        columns: [
            {objectPath: "$.Command", headerName: "Command", prefix: "!"},
            {objectPath: "$.UserGroup.Name", headerName: "User group"},
            {objectPath: "$.Price", headerName: "Price"},
            {objectPath: "$.Price", headerName: "Price (formatted)", suffix: " Bolts"},
            {objectPath: "$.Cooldown", headerName: "Cooldown"},
            {objectPath: "$.Cooldown", headerName: "Cooldown (formatted)", formatter: XLSX_FORMATTER_RELATIVE_TIME},
            {objectPath: "$.Aliasses", headerName: "Aliasses", formatter: XLSX_FORMATTER_LIST_JOIN},
            {objectPath: "$.Message", headerName: "Message"}
        ]
    };
    public tableFilterMapping: TableFilterNameMapping = {
        "group": "Usergroup.Name"
    };
    private _dialog: DialogsService;
    private dataSource: RestTableDataSource<ICustomCommand> = new RestTableDataSource<ICustomCommand>();

    constructor(customCommandsClient: CustomCommandsClient, dialog: DialogsService) {
        this._dialog = dialog;
        this.dataSource.client = customCommandsClient;
    }

    public ngOnInit() {
        this.dataSource.update();
    }

    // noinspection JSMethodCanBeStatic
    public commandHasArgs(command: ICustomCommand): boolean {
        return Object.keys(ARG_COMMAND_REPLACEMENTS)
            .filter((repl: string) => command.Message.indexOf(repl) > -1)
            .length > 0;
    }

    public editCommand(command: ICustomCommand) {
        let dialogRef = this._dialog.open(EditCustomCommandModalComponent, {
            width: "600px",
            data: (command ? command.Id : null)
        });

        let sub = dialogRef.afterClosed()
            .pipe(filter((success: boolean) => success))
            .subscribe(() => {
                this.dataSource.update();
                sub.unsubscribe();
            });
    }
}
