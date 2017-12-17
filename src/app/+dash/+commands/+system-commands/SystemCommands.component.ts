import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {RestTableDataSource} from "../../../shared/modules/ng-material/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatDialog, MatPaginator} from "@angular/material";
import {CommandsClient} from "../../../shared/modules/biliomi/clients/model/Commands.client";
import {EditSystemCommandModalComponent} from "./declarations/EditSystemCommandModal.component";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_JOIN_LIST,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import ICommand = Biliomi.ICommand;

@Component({
  // Since "default" is a pug keyword I chose to name the selector differently
  selector: "system-commands-component",
  templateUrl: require("./SystemCommands.template.pug")
})
export class SystemCommandsComponent implements AfterViewInit {
  private _dialog: MatDialog;
  private dataSource: RestTableDataSource<ICommand> = new RestTableDataSource<ICommand>();

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;

  constructor(commandsClient: CommandsClient, dialog: MatDialog) {
    this._dialog = dialog;
    this.dataSource.bindClient(commandsClient);
    this.dataSource.sortBuilder.add("Command")
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  private exportCommands() {
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - Custom commands",
      sheetName: "Custom commands",
      columns: [
        {objectPath: "$.Command", headerName: "Command", prefix: "!"},
        {objectPath: "$.UserGroup.Name", headerName: "User group"},
        {objectPath: "$.SystemCommand", headerName: "System Command", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
        {objectPath: "$.ModeratorCanAlwaysActivate", headerName: "Moderator Can Always Activate", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
        {objectPath: "$.Price", headerName: "Price"},
        {objectPath: "$.Price", headerName: "Price (formatted)", suffix: " Bolts"},
        {objectPath: "$.Cooldown", headerName: "Cooldown"},
        {objectPath: "$.Cooldown", headerName: "Cooldown (formatted)", formatter: XLSX_FORMATTER_RELATIVE_TIME},
        {objectPath: "$.Aliasses[]", headerName: "Aliasses", formatter: XLSX_FORMATTER_JOIN_LIST},
      ]
    };
    let exporter = new XlsxExporter(config);
    exporter.exportData(this.dataSource.data);
  }
}
