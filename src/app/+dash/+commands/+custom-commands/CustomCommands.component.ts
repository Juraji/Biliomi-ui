import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {MatDialog, MatPaginator} from "@angular/material";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {CustomCommandsClient} from "../../../shared/modules/biliomi/clients/model/CustomCommands.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {ARG_COMMAND_REPLACEMENTS} from "../../../shared/modules/biliomi/classes/constants/CommandReplacements";
import {EditCustomCommandModalComponent} from "./declarations/EditCustomCommandModal.component";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {
  XLSX_FORMATTER_JOIN_LIST,
  XLSX_FORMATTER_RELATIVE_TIME
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import ICustomCommand = Biliomi.ICustomCommand;

@Component({
  selector: "custom-commands-component",
  templateUrl: require("./CustomCommands.template.pug")
})
export class CustomCommandsComponent implements AfterViewInit {
  private _dialog: MatDialog;
  private dataSource: RestTableDataSource<ICustomCommand> = new RestTableDataSource<ICustomCommand>();

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;

  constructor(customCommandsClient: CustomCommandsClient, dialog: MatDialog) {
    this._dialog = dialog;
    this.dataSource.bindClient(customCommandsClient);
    this.dataSource.sortBuilder.add("Command");
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.update();
  }

  // noinspection JSMethodCanBeStatic
  private commandHasArgs(command: ICustomCommand): boolean {
    return Object.keys(ARG_COMMAND_REPLACEMENTS)
      .filter((repl: string) => command.Message.indexOf(repl) > -1)
      .length > 0;
  }

  private editCommand(command: ICustomCommand) {
    let dialogRef = this._dialog.open(EditCustomCommandModalComponent, {
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
        {objectPath: "$.Price", headerName: "Price"},
        {objectPath: "$.Price", headerName: "Price (formatted)", suffix: " Bolts"},
        {objectPath: "$.Cooldown", headerName: "Cooldown"},
        {objectPath: "$.Cooldown", headerName: "Cooldown (formatted)", formatter: XLSX_FORMATTER_RELATIVE_TIME},
        {objectPath: "$.Aliasses", headerName: "Aliasses", formatter: XLSX_FORMATTER_JOIN_LIST},
        {objectPath: "$.Message", headerName: "Message"}
      ]
    };
    let exporter = new XlsxExporter(config);
    exporter.exportData(this.dataSource.data);
  }
}
