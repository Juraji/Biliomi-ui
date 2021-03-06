import { Component, OnInit } from "@angular/core";
import { SystemSettingsClient } from "../../../../../shared/modules/biliomi/clients/settings/SystemSettings.client";
import { FormControl } from "@angular/forms";

@Component({
    selector: "chat-settings-component",
    templateUrl: require("./ChatSettings.template.html")
})
export class ChatSettingsComponent implements OnInit {
    private _systemSettingsClient: SystemSettingsClient;

    private enableWhispersControl: FormControl = new FormControl(false);
    private muteBiliomiControl: FormControl = new FormControl(false);

    constructor(systemSettingsClient: SystemSettingsClient) {
        this._systemSettingsClient = systemSettingsClient;
    }

    public async ngOnInit() {
        await this._systemSettingsClient.load(true);
        this.enableWhispersControl.reset(this._systemSettingsClient.EnableWhispers);
        this.muteBiliomiControl.reset(this._systemSettingsClient.Muted);
    }

    public async save(): Promise<boolean> {
        this._systemSettingsClient.EnableWhispers = this.enableWhispersControl.value;
        this._systemSettingsClient.Muted = this.muteBiliomiControl.value;
        let result = await this._systemSettingsClient.save();

        return result != null;
    }
}
