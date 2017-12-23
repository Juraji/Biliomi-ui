import {Component, OnInit} from "@angular/core";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatDialog} from "@angular/material";
import {CommandsClient} from "../../../shared/modules/biliomi/clients/model/Commands.client";
import {EditSystemCommandModalComponent} from "./declarations/EditSystemCommandModal.component";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO, XLSX_FORMATTER_LIST_JOIN,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import ICommand = Biliomi.ICommand;
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/TableFilterMapping.interface";

@Component({
  // Since "default" is a pug keyword I chose to name the selector differently
  selector: "system-commands-component",
  templateUrl: require("./SystemCommands.template.pug")
})
export class SystemCommandsComponent implements OnInit {
  private _dialog: MatDialog;
  private dataSource: RestTableDataSource<ICommand> = new RestTableDataSource<ICommand>();

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Custom commands",
    sheetName: "Custom commands",
    columns: [
      {objectPath: "$.Command", headerName: "Command", prefix: "!"},
      {objectPath: "$.UserGroup.Name", headerName: "User group"},
      {objectPath: "$.SystemCommand", headerName: "System Command", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
      {
        objectPath: "$.ModeratorCanAlwaysActivate",
        headerName: "Moderator Can Always Activate",
        formatter: XLSX_FORMATTER_BOOLEAN_YES_NO
      },
      {objectPath: "$.Price", headerName: "Price"},
      {objectPath: "$.Price", headerName: "Price (formatted)", suffix: " Bolts"},
      {objectPath: "$.Cooldown", headerName: "Cooldown"},
      {objectPath: "$.Cooldown", headerName: "Cooldown (formatted)", formatter: XLSX_FORMATTER_RELATIVE_TIME},
      {objectPath: "$.Aliasses[]", headerName: "Aliasses", formatter: XLSX_FORMATTER_LIST_JOIN},
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "System Command": "SystemCommand",
    "Group": "Usergroup.Name"
  };

  constructor(commandsClient: CommandsClient, dialog: MatDialog) {
    this._dialog = dialog;
    this.dataSource.client = commandsClient;
  }

  public ngOnInit() {
    this.dataSource.update();
  }

  private editCommand(command: ICommand) {
    let dialogRef = this._dialog.open(EditSystemCommandModalComponent, {
      width: '600px',
      data: (command ? command.Id : null)
    });

    dialogRef.afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.dataSource.update());
  }
}
