import {Component, EventEmitter, Output, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {UserAutoCompleteComponent} from "../../../../../shared/components/UserAutoComplete.component";
import * as moment from "moment";
import {HostRecordsClient} from "../../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import {DialogsService} from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import {SaveButtonComponent} from "../../../../../shared/components/SaveButton.component";
import IDirection = Biliomi.IDirection;
import IHostRecord = Biliomi.IHostRecord;

@Component({
  selector: "host-form-component",
  templateUrl: require("./HostForm.template.pug")
})
export class HostFormComponent {
  private _hostRecordsClient: HostRecordsClient;
  private _dialogs: DialogsService;

  @ViewChild(SaveButtonComponent)
  public saveButton: SaveButtonComponent;

  public recordAutoHostControl: FormControl = new FormControl(false);
  public performHostControl: FormControl = new FormControl(false);
  public recordDirectionControl: FormControl = new FormControl(IDirection.OUTGOING);

  @ViewChild("recordUserControl", {read: UserAutoCompleteComponent})
  public recordUserControl: UserAutoCompleteComponent;

  @Output("onRecordCreated")
  public onRecordCreated: EventEmitter<IHostRecord> = new EventEmitter<IHostRecord>();

  constructor(hostRecordsClient: HostRecordsClient, dialogs: DialogsService) {
    this._hostRecordsClient = hostRecordsClient;
    this._dialogs = dialogs;
  }

  public get isFormOk(): boolean {
    return this.recordUserControl.valid;
  }

  public async submitHostRecord() {
    if (this.isFormOk) {
      let record: IHostRecord = {} as IHostRecord;
      record.User = this.recordUserControl.user;
      record.Date = moment().format();
      record.Direction = this.recordDirectionControl.value;
      record.AutoHost = this.recordAutoHostControl.value;

      console.log(record.Direction);
      if (record.Direction === IDirection.OUTGOING && this.performHostControl.value) {
        this._dialogs.confirm(`Are you sure you want to host ${record.User.DisplayName}?`)
          .filter((confirmed: boolean) => confirmed)
          .subscribe(async () => {
            this.saveButton.state = await this._hostRecordsClient.performHost(record.User.Username);
            this.onRecordCreated.emit(record);
          });
      } else {
        let response: IHostRecord = await this._hostRecordsClient.post(record);
        if (response != null) {
          this.recordAutoHostControl.reset(false);
          this.performHostControl.reset(false);
          this.recordDirectionControl.reset(IDirection.OUTGOING);
          this.recordUserControl.reset();
          this.onRecordCreated.emit(response);
          this.saveButton.state = true;
          this.onRecordCreated.emit(response);
        } else {
          this.saveButton.state = false;
        }
      }
    }
  }
}
