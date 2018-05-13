import { Component, OnInit } from "@angular/core";
import { PointsSettingsClient } from "../../../../../shared/modules/biliomi/clients/settings/PointsSettings.client";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "points-settings-component",
    templateUrl: require("./PointsSettings.template.html")
})
export class PointsSettingsComponent implements OnInit {
    private _pointsSettingsClient: PointsSettingsClient;

    private pointsNameSingularControl: FormControl = new FormControl("", [Validators.required]);
    private pointsNamePluralControl: FormControl = new FormControl("", [Validators.required]);
    private trackOnlineControl: FormControl = new FormControl(false);
    private trackOfflineControl: FormControl = new FormControl(false);
    private onlinePayoutIntervalControl: FormControl = new FormControl(0, [Validators.required, Validators.min(60000)]);
    private offlinePayoutIntervalControl: FormControl = new FormControl(0, [Validators.required, Validators.min(60000)]);
    private onlinePayoutAmountControl: FormControl = new FormControl(0, [Validators.required, Validators.min(1)]);
    private offlinePayoutAmountControl: FormControl = new FormControl(0, [Validators.required, Validators.min(1)]);

    constructor(pointsSettingsClient: PointsSettingsClient) {
        this._pointsSettingsClient = pointsSettingsClient;
    }

    public get isFormOk(): boolean {
        return this.pointsNameSingularControl.valid
            && this.pointsNamePluralControl.valid
            && (this.trackOnlineControl.value === false || (this.onlinePayoutIntervalControl.valid && this.onlinePayoutAmountControl.valid))
            && (this.trackOfflineControl.value === false || (this.offlinePayoutIntervalControl.valid && this.offlinePayoutAmountControl.valid));
    }

    public async ngOnInit() {
        await this._pointsSettingsClient.load(true);
        this.pointsNameSingularControl.reset(this._pointsSettingsClient.PointsNameSingular);
        this.pointsNamePluralControl.reset(this._pointsSettingsClient.PointsNamePlural);
        this.trackOnlineControl.reset(this._pointsSettingsClient.TrackOnline);
        this.trackOfflineControl.reset(this._pointsSettingsClient.TrackOffline);
        this.onlinePayoutIntervalControl.reset(this._pointsSettingsClient.OnlinePayoutInterval);
        this.offlinePayoutIntervalControl.reset(this._pointsSettingsClient.OfflinePayoutInterval);
        this.onlinePayoutAmountControl.reset(this._pointsSettingsClient.OnlinePayoutAmount);
        this.offlinePayoutAmountControl.reset(this._pointsSettingsClient.OfflinePayoutAmount);
    }

    public async save() {
        if (this.isFormOk) {
            this._pointsSettingsClient.PointsNameSingular = this.pointsNameSingularControl.value;
            this._pointsSettingsClient.PointsNamePlural = this.pointsNamePluralControl.value;
            this._pointsSettingsClient.TrackOnline = this.trackOnlineControl.value;
            this._pointsSettingsClient.TrackOffline = this.trackOfflineControl.value;
            this._pointsSettingsClient.OnlinePayoutInterval = this.onlinePayoutIntervalControl.value;
            this._pointsSettingsClient.OfflinePayoutInterval = this.offlinePayoutIntervalControl.value;
            this._pointsSettingsClient.OnlinePayoutAmount = this.onlinePayoutAmountControl.value;
            this._pointsSettingsClient.OfflinePayoutAmount = this.offlinePayoutAmountControl.value;
            let result = await this._pointsSettingsClient.save();

            return result != null;
        }

        return null;
    }
}
