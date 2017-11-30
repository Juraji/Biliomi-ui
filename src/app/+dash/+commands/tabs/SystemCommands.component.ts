import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {RestMatDataSource} from "../../../shared/modules/ng-material/classes/RestMatDataSource.class";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatDialog, MatPaginator} from "@angular/material";
import {CommandsClient} from "../../../shared/modules/biliomi/clients/model/Commands.client";
import {EditDefaultCommandModalComponent} from "../declarations/EditDefaultCommandModal.component";
import {SortBuilder} from "../../../shared/modules/biliomi/classes/SortBuilder";
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
  templateUrl: require("./SystemCommands.template.pug"),
  styleUrls: [require("./Commands.less").toString()]
})
export class SystemCommandsComponent implements OnInit, AfterViewInit {
  private _dialog: MatDialog;
  private dataSource: RestMatDataSource<ICommand> = new RestMatDataSource<ICommand>();

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;

  constructor(commandsClient: CommandsClient, dialog: MatDialog) {
    this.dataSource.bindClient(commandsClient);
    this._dialog = dialog;
  }

  public ngOnInit() {
    let sort = new SortBuilder().add("Command");
    this.dataSource.updateData(sort);
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private editCommand(command: ICommand) {
    let dialogRef = this._dialog.open(EditDefaultCommandModalComponent, {
      width: '600px',
      data: (command ? command.Id : null)
    });

    dialogRef.afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.dataSource.updateData());
  }

  private exportCommands() {
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - Custom commands",
      sheetName: "Custom commands",
      sortBy: "Command",
      columns: [
        {objectPath: "$.Command", headerName: "Command", prefix: "!"},
        {objectPath: "$.UserGroup.Name", headerName: "User group"},
        {objectPath: "$.SystemCommand", headerName: "System Command", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
        {objectPath: "$.ModeratorCanAlwaysActivate", headerName: "Moderator Can Always Activate", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
        {objectPath: "$.Price", headerName: "Price"},
        {objectPath: "$.Price", headerName: "Price (formatted)", suffix: " Bolts"},
        {objectPath: "$.Cooldown", headerName: "Cooldown"},
        {objectPath: "$.Cooldown", headerName: "Cooldown (formatted)", formatter: XLSX_FORMATTER_RELATIVE_TIME},
        {objectPath: "$.Aliasses", headerName: "Aliasses", formatter: XLSX_FORMATTER_JOIN_LIST},
      ]
    };
    let exporter = new XlsxExporter(config);
    exporter.exportData(this.dataSource.data);
  }
}
