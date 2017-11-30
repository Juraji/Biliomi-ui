import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {RestMatDataSource} from "../../../shared/modules/ng-material/classes/RestMatDataSource.class";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatDialog, MatPaginator} from "@angular/material";
import {CommandsClient} from "../../../shared/modules/biliomi/clients/model/Commands.client";
import {EditDefaultCommandModalComponent} from "../declarations/EditDefaultCommandModal.component";
import {SortBuilder} from "../../../shared/modules/biliomi/classes/SortBuilder";
import {XlsxExporter} from "../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {SYSTEM_COMMANDS_EXPORT_DEFINITION} from "./CommandExportDefinitions";
import ICommand = Biliomi.ICommand;

@Component({
  // Since "default" is a pug keyword I chose to name the selector differently
  selector: "system-commands-component",
  templateUrl: require("./SystemCommands.template.pug"),
  styleUrls: [require("./CustomCommands.less").toString()]
})
export class SystemCommandsComponent implements OnInit, AfterViewInit {
  private _dialog: MatDialog;
  private dataSource: RestMatDataSource<ICommand> = new RestMatDataSource<ICommand>();
  private xlsxExporter: XlsxExporter;

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;

  constructor(commandsClient: CommandsClient, dialog: MatDialog) {
    this.dataSource.bindClient(commandsClient);
    this._dialog = dialog;
    this.xlsxExporter = new XlsxExporter(SYSTEM_COMMANDS_EXPORT_DEFINITION);
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
}
