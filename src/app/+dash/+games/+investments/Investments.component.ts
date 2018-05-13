import { Component, OnInit } from "@angular/core";
import { InvestmentRecordsClient } from "../../../shared/modules/biliomi/clients/model/InvestmentRecords.client";
import { InvestmentSettingsClient } from "../../../shared/modules/biliomi/clients/settings/InvestmentSettings.client";
import { RestTableDataSource } from "../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { FormControl, Validators } from "@angular/forms";
import { TableFilterNameMapping } from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import { IXlsxExportConfig } from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import { XLSX_FORMATTER_DATE } from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import { DialogsService } from "../../../shared/modules/dialogs/services/Dialogs.service";
import IInvestmentRecord = Biliomi.IInvestmentRecord;

@Component({
    selector: "investments",
    templateUrl: require("./Investments.template.html")
})
export class InvestmentsComponent implements OnInit {
    public dataSource: RestTableDataSource<IInvestmentRecord> = new RestTableDataSource<IInvestmentRecord>();
    public investmentDurationControl: FormControl = new FormControl(0, [Validators.required, Validators.min(60000)]);
    public minInterestControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0.01), Validators.max(1)]);
    public maxInterestControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0.01), Validators.max(1)]);
    public filterMapping: TableFilterNameMapping = {
        "invester": "invester.username"
    };
    public exportConfig: IXlsxExportConfig = {
        fileName: "Biliomi - Investments",
        sheetName: "Investments",
        columns: [
            {objectPath: "$.Invester.DisplayName", headerName: "Username"},
            {objectPath: "$.Invested", headerName: "Points invested"},
            {objectPath: "$.Interest", headerName: "Interest"},
            {objectPath: "$.Project", headerName: "Project"},
            {objectPath: "$.Payout", headerName: "Payout"},
            {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE}
        ]
    };
    private _investmentSettingsClient: InvestmentSettingsClient;
    private _dialogs: DialogsService;

    constructor(investmentRecordsClient: InvestmentRecordsClient,
                investmentSettingsClient: InvestmentSettingsClient,
                dialogs: DialogsService) {
        this.dataSource.client = investmentRecordsClient;
        this._dialogs = dialogs;
        this._investmentSettingsClient = investmentSettingsClient;
    }

    public get isSettingsFormOk(): boolean {
        return this.investmentDurationControl.valid
            && this.minInterestControl.valid
            && this.maxInterestControl.valid
            && this.minInterestControl.value < this.maxInterestControl.value;
    }

    public ngOnInit(): void {
        this.initSettingsFields();
    }

    public async initSettingsFields() {
        await this._investmentSettingsClient.load(true);
        this.investmentDurationControl.reset(this._investmentSettingsClient.InvestmentDuration);
        this.minInterestControl.reset(this._investmentSettingsClient.MinInterest);
        this.maxInterestControl.reset(this._investmentSettingsClient.MaxInterest);
    }

    public async saveSettings() {
        if (this.isSettingsFormOk) {
            this._investmentSettingsClient.InvestmentDuration = this.investmentDurationControl.value;
            this._investmentSettingsClient.MinInterest = this.minInterestControl.value;
            this._investmentSettingsClient.MaxInterest = this.maxInterestControl.value;

            let result = this._investmentSettingsClient.save();
            if (result) {
                this.initSettingsFields();
            }
        }
    }

    public async deleteRecord(record: IInvestmentRecord) {
        let confirmed = await this._dialogs.confirm(`Arou you sure you want to delete this roulette record for ${record.Invester.DisplayName}?`);
        if (confirmed) {
            let success = this.dataSource.client.delete(record.Id);
            if (success) {
                this.dataSource.update();
            }

            return success;
        }

        return null;
    }
}
