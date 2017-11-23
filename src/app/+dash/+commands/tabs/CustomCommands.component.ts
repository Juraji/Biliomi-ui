import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {CustomCommandsClient} from "../../../shared/modules/biliomi/clients/model/CustomCommands.client";
import {BiliomiApiService} from "../../../shared/modules/biliomi/services/BiliomiApi.service";
import {RestMatDataSource} from "../../../shared/modules/ng-material/classes/RestMatDataSource.class";
import {ARG_COMMAND_REPLACEMENTS} from "../../../shared/modules/biliomi/classes/constants/CommandReplacements";
import ICustomCommand = Biliomi.ICustomCommand;

@Component({
  selector: "custom-commands-component",
  templateUrl: require("./CustomCommands.template.pug"),
  styleUrls: [require("./CustomCommands.less").toString()]
})
export class CustomCommandsComponent implements OnInit, AfterViewInit {
  private _api: BiliomiApiService;
  private dataSource: RestMatDataSource<ICustomCommand> = new RestMatDataSource<ICustomCommand>();

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;

  constructor(customCommandsClient: CustomCommandsClient, api: BiliomiApiService) {
    this.dataSource.bindClient(customCommandsClient);
    this._api = api;
  }

  public ngOnInit() {
    this.dataSource.updateData();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // noinspection JSMethodCanBeStatic
  private commandHasArgs(command: ICustomCommand): boolean {
    return Object.keys(ARG_COMMAND_REPLACEMENTS)
      .filter((repl: string) => command.Message.indexOf(repl) > -1)
      .length > 0;
  }

  private editCommand(command: ICustomCommand) {
    // Todo: Open up modal for editing
  }
}
