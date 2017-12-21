import {Component, EventEmitter, Output, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {UserAutoCompleteComponent} from "../../../../shared/components/UserAutoComplete.component";
import * as moment from "moment";
import {HostRecordsClient} from "../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import IDirection = Biliomi.IDirection;
import IHostRecord = Biliomi.IHostRecord;

@Component({
  selector: "host-form-component",
  templateUrl: require("./HostForm.template.pug")
})
export class HostFormComponent {
  private _hostRecordsClient: HostRecordsClient;

  public recordAutoHostControl: FormControl = new FormControl(false);
  public recordDirectionControl: FormControl = new FormControl(IDirection.OUTGOING);

  @ViewChild("recordUserControl", {read: UserAutoCompleteComponent})
  public recordUserControl: UserAutoCompleteComponent;

  @Output("onRecordCreated")
  public onRecordCreated: EventEmitter<IHostRecord> = new EventEmitter<IHostRecord>();

  constructor(hostRecordsClient: HostRecordsClient) {
    this._hostRecordsClient = hostRecordsClient;
  }

  public get isFormOk(): boolean {
    return this.recordUserControl.valid;
  }

  public async submitHostRecord() {
    if (this.isFormOk) {
      let record: IHostRecord = {} as IHostRecord;
      record.User = await this.recordUserControl.getSelectedUser();
      record.Date = moment().format();
      record.Direction = this.recordDirectionControl.value;
      record.AutoHost = this.recordAutoHostControl.value;

      let response: IHostRecord = await this._hostRecordsClient.post(record);
      if (response != null) {
        this.recordAutoHostControl.setValue(false);
        this.recordDirectionControl.setValue(IDirection.INCOMING);
        this.recordUserControl.reset();
        this.onRecordCreated.emit(response);
      }
    }
  }
}
