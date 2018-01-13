import {AfterViewInit, Component, Inject, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {DialogsService} from "../../../../../shared/modules/dialogs/services/Dialogs.service";
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
  private _dialog: DialogsService;

  public editedDonation: IDonation;
  public donationControl: FormControl = new FormControl("", [Validators.required]);
  public dateControl: FormControl = new FormControl("", [Validators.required]);
  public noteControl: FormControl = new FormControl();

  @ViewChild("userControl", {read: UserAutoCompleteComponent})
  public userControl: UserAutoCompleteComponent;

  public get isFormOk(): boolean {
    return this.donationControl.valid
      && this.dateControl.valid
      && this.userControl.valid;
  }

  constructor(@Inject(MAT_DIALOG_DATA) donationId: number,
              donationsClient: DonationsClient,
              dialogRef: MatDialogRef<EditAnnouncementModalComponent>,
              matSnackBar: MatSnackBar,
              dialog: DialogsService) {
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

    this.donationControl.reset(this.editedDonation.Donation);
    this.dateControl.reset(this.editedDonation.Date);
    this.noteControl.reset(this.editedDonation.Note);
    this.userControl.user = this.editedDonation.User;
  }

  public saveAndStateInChat() {
    if (this.isFormOk) {
      this._dialog.confirm(["Notifying in the chat will use the !donation add command in order to save the donation.",
        " Doing this will discard any set note and generate a new date, are you sure?"])
        .filter((confirmed: boolean) => confirmed)
        .subscribe(async () => {
          let username: string = (await this.userControl.user).Username;
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
      let donation: IDonation = {...this.editedDonation};
      let persistedDonation: IDonation;

      donation.Donation = this.donationControl.value;
      donation.Date = this.dateControl.value;
      donation.User = await this.userControl.user;
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
