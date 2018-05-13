import { Component } from "@angular/core";
import { DonationsClient } from "../../../../shared/modules/biliomi/clients/model/Donations.client";
import { RestTableDataSource } from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { IXlsxExportConfig } from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import { TableFilterNameMapping } from "../../../../shared/modules/data-table/classes/interfaces/DataTable";
import { XLSX_FORMATTER_DATE } from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import { EditDonationModalComponent } from "./declarations/EditDonationModal.component";
import { DialogsService } from "../../../../shared/modules/dialogs/services/Dialogs.service";
import { filter } from "rxjs/operators";
import IDonation = Biliomi.IDonation;

@Component({
    selector: "donations",
    templateUrl: require("./Donations.template.html")
})
export class DonationsComponent {
    public donationsDataSource: RestTableDataSource<IDonation> = new RestTableDataSource<IDonation>();
    public exportConfig: IXlsxExportConfig = {
        fileName: "Biliomi - Donations",
        sheetName: "Donations",
        columns: [
            {objectPath: "$.User.DisplayName", headerName: "Username"},
            {objectPath: "$.Donation", headerName: "Donation"},
            {objectPath: "$.Note", headerName: "Note"},
            {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE}
        ]
    };
    public tableFilterMapping: TableFilterNameMapping = {
        "Username": "User.Username"
    };
    private _dialog: DialogsService;

    constructor(donationsClient: DonationsClient,
                dialog: DialogsService) {
        this.donationsDataSource.client = donationsClient;
        this._dialog = dialog;
    }

    editDonation(donation: IDonation) {
        let dialogRef = this._dialog.open(EditDonationModalComponent, {
            width: "600px",
            data: (donation ? donation.Id : null)
        });

        let sub = dialogRef.afterClosed()
            .pipe(filter((success: boolean) => success))
            .subscribe(() => {
                this.donationsDataSource.update();
                sub.unsubscribe();
            });
    }
}
