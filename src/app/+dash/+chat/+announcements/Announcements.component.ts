import {Component, OnInit} from "@angular/core";
import {AnnouncementsClient} from "../../../shared/modules/biliomi/clients/model/Announcements.client";
import {AnnouncementSettingsClient} from "../../../shared/modules/biliomi/clients/settings/AnnouncementSettings.client";
import {DialogsService} from "../../../shared/modules/dialogs/services/Dialogs.service";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {FormControl, Validators} from "@angular/forms";
import {EditAnnouncementModalComponent} from "./declarations/EditAnnouncementModal.component";
import IAnnouncement = Biliomi.IAnnouncement;

@Component({
  selector: "announcements",
  templateUrl: require("./Announcements.template.pug")
})
export class AnnouncementsComponent implements OnInit {
  private _announcementSettingsClient: AnnouncementSettingsClient;
  private _dialog: DialogsService;

  public announcementsDataSource: RestTableDataSource<IAnnouncement> = new RestTableDataSource<IAnnouncement>();
  public enabledControl: FormControl = new FormControl(false);
  public shuffleControl: FormControl = new FormControl(false);
  public runIntervalControl: FormControl = new FormControl(0, [Validators.min(10000)]);
  public minChatMessagesControl: FormControl = new FormControl(0);

  public filterMapping: TableFilterNameMapping = {};

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Announcements",
    sheetName: "Announcements",
    columns: [
      {objectPath: "$.Message", headerName: "Message"}
    ]
  };

  constructor(announcementsClient: AnnouncementsClient,
              announcementSettingsClient: AnnouncementSettingsClient,
              dialog: DialogsService) {
    this._announcementSettingsClient = announcementSettingsClient;
    this._dialog = dialog;
    this.announcementsDataSource.client = announcementsClient;
  }

  public async ngOnInit() {
    await this._announcementSettingsClient.load(true);
    this.initSettingsFields();
  }

  public initSettingsFields() {
    this.enabledControl.reset(this._announcementSettingsClient.Enabled);
    this.shuffleControl.reset(this._announcementSettingsClient.Shuffle);
    this.runIntervalControl.reset(this._announcementSettingsClient.RunInterval);
    this.minChatMessagesControl.reset(this._announcementSettingsClient.MinChatMessages);
  }

  public saveSettings() {
    this._announcementSettingsClient.Enabled = this.enabledControl.value;
    this._announcementSettingsClient.Shuffle = this.shuffleControl.value;
    this._announcementSettingsClient.RunInterval = this.runIntervalControl.value;
    this._announcementSettingsClient.MinChatMessages = this.minChatMessagesControl.value;

    let result = this._announcementSettingsClient.save();
    if (result != null) {
      this.initSettingsFields();
    }
  }

  public editAnnouncement(announcement: IAnnouncement) {
    let dialogRef = this._dialog.open(EditAnnouncementModalComponent, {
      width: "600px",
      data: (announcement ? announcement.Id : null)
    });

    dialogRef.afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.announcementsDataSource.update());
  }
}
