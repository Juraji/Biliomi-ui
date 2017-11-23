import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {BiliomiApiService} from "../../../shared/modules/biliomi/services/BiliomiApi.service";
import {RestMatDataSource} from "../../../shared/modules/ng-material/classes/RestMatDataSource.class";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatPaginator} from "@angular/material";
import {CommandsClient} from "../../../shared/modules/biliomi/clients/model/Commands.client";
import ICommand = Biliomi.ICommand;

@Component({
  // Since "default" is a pug keyword I chose to name the selector differently
  selector: "system-commands-component",
  templateUrl: require("./SystemCommands.template.pug")
})
export class SystemCommandsComponent implements OnInit, AfterViewInit {
  private _api: BiliomiApiService;
  private dataSource: RestMatDataSource<ICommand> = new RestMatDataSource<ICommand>();

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;

  constructor(commandsClient: CommandsClient, api: BiliomiApiService) {
    this.dataSource.bindClient(commandsClient);
    this._api = api;
  }

  public ngOnInit() {
    this.dataSource.updateData();
  }

  public ngAfterViewInit() {
    console.log(this.paginator);
    this.dataSource.paginator = this.paginator;
  }

  private editCommand(command: ICommand) {
    // Todo: Open up modal for editing
  }
}
