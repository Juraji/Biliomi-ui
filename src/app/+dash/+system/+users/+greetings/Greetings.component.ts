import {Component, OnInit} from "@angular/core";
import {UserGreetingsClient} from "../../../../shared/modules/biliomi/clients/model/UserGreetings.client";
import {UserGreetingSettingsClient} from "../../../../shared/modules/biliomi/clients/settings/UserGreetingSettings.client";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/DataTable";
import {DialogsService} from "../../../../shared/modules/dialogs/services/Dialogs.service";
import {EditGreetingComponent} from "./declarations/EditGreeting.component";
import {FormControl, Validators} from "@angular/forms";
import IUserGreeting = Biliomi.IUserGreeting;

@Component({
  selector: "greetings",
  templateUrl: require("./Greetings.template.pug")
})
export class GreetingsComponent implements OnInit {
  private _greetingSettingsClient: UserGreetingSettingsClient;
  private _userGreetingsClient: UserGreetingsClient;
  private _dialogs: DialogsService;

  public dataSource: RestTableDataSource<IUserGreeting> = new RestTableDataSource<IUserGreeting>();

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - User Greetings",
    sheetName: "User Greetings",
    columns: [
      {objectPath: "$.User.DisplayName", headerName: "Username"},
      {objectPath: "$.Message", headerName: "Message"}
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "username": "User.Username"
  };

  public enableGreetingsControl: FormControl = new FormControl(false);
  public greetingTimeoutControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  public get isFormOk(): boolean {
    return !this.enableGreetingsControl
      || this.greetingTimeoutControl.valid;
  }

  constructor(userGreetingsClient: UserGreetingsClient,
              greetingSettingsClient: UserGreetingSettingsClient,
              dialogs: DialogsService) {
    this._userGreetingsClient = userGreetingsClient;
    this._greetingSettingsClient = greetingSettingsClient;
    this._dialogs = dialogs;

    this.dataSource.client = this._userGreetingsClient;
  }

  public ngOnInit() {
    this.initSettingsFields();
  }

  public async initSettingsFields() {
    await this._greetingSettingsClient.load(true);
    this.enableGreetingsControl.reset(this._greetingSettingsClient.EnableGreetings);
    this.greetingTimeoutControl.reset(this._greetingSettingsClient.GreetingTimeout);
  }

  public editUserGreeting(greeting: IUserGreeting) {
    this._dialogs.open(EditGreetingComponent, {data: greeting.Id})
      .afterClosed()
      .filter((greetingUpdated: boolean) => greetingUpdated)
      .subscribe(() => this.dataSource.update());
  }

  public async saveSettings() {
    if (this.isFormOk) {
      this._greetingSettingsClient.EnableGreetings = this.enableGreetingsControl.value;
      this._greetingSettingsClient.GreetingTimeout = this.greetingTimeoutControl.value;
      await this._greetingSettingsClient.save();
      this.initSettingsFields();
    }
  }
}
