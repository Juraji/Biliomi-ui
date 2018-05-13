import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { DonationsComponent } from "./Donations.component";
import { EditDonationModalComponent } from "./declarations/EditDonationModal.component";

const ROUTES: Routes = [
    {
        path: "",
        component: DonationsComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        DonationsComponent,
        EditDonationModalComponent
    ],
    entryComponents: [EditDonationModalComponent]
})
export class DonationsModule {
}
