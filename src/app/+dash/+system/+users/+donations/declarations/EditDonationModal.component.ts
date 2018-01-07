import {AfterViewInit, Component, Inject, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {ConfirmDialogService} from "../../../../../shared/modules/confirm-dialog/services/ConfirmDialog.service";
import {EditAnnouncementModalComponent} from "../../../../+chat/+announcements/declarations/EditAnnouncementModal.component";
import {DonationsClient} from "../../../../../shared/modules/biliomi/clients/model/Donations.client";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import * as moment from "moment";
import {FormControl, Validators} from "@angular/forms";
import {UserAutoCompleteComponent} from "../../../../../shared/components/UserAutoComplete.component";
import {DatePipe} from "../../../../../shared/pipes/Date.pipe";
import IDonation = Biliomi.IDonation;

@Component({
  selector: "edit-donation-modal",
  templateUrl: require("./EditDonationModal.template.pug")
})
export class EditDonationModalComponent implements AfterViewInit {
  private _donationId: number;
  private _donationsClient: DonationsClient;
  private _dialogRef: MatDialogRef<EditAnnouncementModalComponent>;
  private _matSnackBar: MatSnackBar;
  private _dialog: ConfirmDialogService;

  public editedDonation: IDonation;
  public donationControl: FormControl = new FormControl("", [Validators.required]);
  public dateControl: FormControl = new FormControl("", [Validators.required]);
  public noteControl: FormControl = new FormControl();

  @ViewChild("userControl", {read: UserAutoCompleteComponent})
  public userControl: UserAutoCompleteComponent;

  public get isFormOk(): boolean {
    console.log(this.donationControl.valid, this.dateControl.valid, this.userControl.valid)
    return this.donationControl.valid
      && this.dateControl.valid
      && this.userControl.valid;
  }

  constructor(@Inject(MAT_DIALOG_DATA) donationId: number,
              donationsClient: DonationsClient,
              dialogRef: MatDialogRef<EditAnnouncementModalComponent>,
              matSnackBar: MatSnackBar,
              dialog: ConfirmDialogService) {
    this._donationId = donationId;
    this._donationsClient = donationsClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;
    this._dialog = dialog;
  }

  public async ngAfterViewInit() {
    if (this._donationId != null) {
      this.editedDonation = await this._donationsClient.get(this._donationId);
    }

    this.initFields();
  }

  public initFields() {
    if (this._donationId == null) {
      this.editedDonation = {} as IDonation;
      this.editedDonation.Date = moment().toISOString();
      this.editedDonation.Donation = "";
      this.editedDonation.Note = "";
    }

    this.donationControl.setValue(this.editedDonation.Donation);
    this.dateControl.setValue(this.editedDonation.Date);
    this.noteControl.setValue(this.editedDonation.Note);
    this.userControl.selectedUser = this.editedDonation.User;
  }

  public saveAndStateInChat() {
    if (this.isFormOk) {
      this._dialog.confirm("This action will discard any note provided and regenerate the date, are you sure?")
        .filter((confirmed: boolean) => confirmed)
        .subscribe(async () => {
          let username: string = (await this.userControl.getSelectedUser()).Username;
          let donation: string = this.donationControl.value;
          let success = await this._donationsClient.saveAsCommand(username, donation);

          if (success) {
            this._dialogRef.close(true);
          } else {
            this._matSnackBar.open("Failed executing command for donation", "Ok");
          }
        });
    }
  }

  public async save() {
    if (this.isFormOk) {
      let donation: IDonation = {} as IDonation;
      let persistedDonation: IDonation;

      Object.assign(donation, this.editedDonation);
      donation.Donation = this.donationControl.value;
      donation.Date = this.dateControl.value;
      donation.User = await this.userControl.getSelectedUser();
      donation.Note = this.noteControl.value;

      if (this._donationId == null) {
        persistedDonation = await this._donationsClient.post(donation);
      } else {
        persistedDonation = await this._donationsClient.put(this._donationId, donation);
      }

      if (persistedDonation == null) {
        this._matSnackBar.open(`Could not save donation for ${donation.User.DisplayName}, check your input`, "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  public deleteDonation() {
    if (this._donationId != null) {
      let dateString = new DatePipe().transform(this.editedDonation.Date);
      this._dialog.confirm(`Are you sure you want to delete the donation by ${this.editedDonation.User.DisplayName} on ${dateString}?`)
        .filter((confirmed: boolean) => confirmed)
        .subscribe(async () => {
          let success: boolean = await this._donationsClient.delete(this._donationId);
          if (success) {
            this._dialogRef.close(true);
          } else {
            this._matSnackBar.open("Could not delete donation, does it still exist?", "Ok");
          }
        });
    }
  }

  public cancelEdit() {
    this._dialogRef.close(false);
  }
}
