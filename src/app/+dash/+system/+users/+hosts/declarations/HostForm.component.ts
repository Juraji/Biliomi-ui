import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Biliomi } from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { UserAutoCompleteComponent } from "../../../../../shared/components/UserAutoComplete.component";
import * as moment from "moment";
import { HostRecordsClient } from "../../../../../shared/modules/biliomi/clients/model/HostRecords.client";
import { DialogsService } from "../../../../../shared/modules/dialogs/services/Dialogs.service";
import IDirection = Biliomi.IDirection;
import IHostRecord = Biliomi.IHostRecord;

@Component({
    selector: "host-form-component",
    templateUrl: require("./HostForm.template.html")
})
export class HostFormComponent {
    public recordAutoHostControl: FormControl = new FormControl(false);
    public performHostControl: FormControl = new FormControl(false);
    public recordDirectionControl: FormControl = new FormControl(IDirection.OUTGOING);
    @ViewChild("recordUserControl", {read: UserAutoCompleteComponent})
    public recordUserControl: UserAutoCompleteComponent;
    @Output("onRecordCreated")
    public onRecordCreated: EventEmitter<IHostRecord> = new EventEmitter<IHostRecord>();
    private _hostRecordsClient: HostRecordsClient;
    private _dialogs: DialogsService;

    constructor(hostRecordsClient: HostRecordsClient, dialogs: DialogsService) {
        this._hostRecordsClient = hostRecordsClient;
        this._dialogs = dialogs;
    }

    public get isFormOk(): boolean {
        return this.recordUserControl.valid;
    }

    public async submitHostRecord(): Promise<boolean> {
        if (this.isFormOk) {
            let record: IHostRecord = {} as IHostRecord;
            record.User = this.recordUserControl.user;
            record.Date = moment().format();
            record.Direction = this.recordDirectionControl.value;
            record.AutoHost = this.recordAutoHostControl.value;

            console.log(record.Direction);
            if (record.Direction === IDirection.OUTGOING && this.performHostControl.value) {
                let confirmed = await this._dialogs.confirm(`Are you sure you want to host ${record.User.DisplayName}?`);
                if (confirmed) {
                    this.onRecordCreated.emit(record);
                    return this._hostRecordsClient.performHost(record.User.Username);
                }

            } else {
                let response: IHostRecord = await this._hostRecordsClient.post(record);
                if (response != null) {
                    this.recordAutoHostControl.reset(false);
                    this.performHostControl.reset(false);
                    this.recordDirectionControl.reset(IDirection.OUTGOING);
                    this.recordUserControl.reset();
                    this.onRecordCreated.emit(response);

                    return true;
                } else {
                    return false;
                }
            }
        }

        return null;
    }
}
