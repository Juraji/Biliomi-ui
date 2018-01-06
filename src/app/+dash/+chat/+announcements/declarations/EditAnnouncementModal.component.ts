import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {AnnouncementsClient} from "../../../../shared/modules/biliomi/clients/model/Announcements.client";
import {ConfirmDialogService} from "../../../../shared/modules/confirm-dialog/services/ConfirmDialog.service";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import IAnnouncement = Biliomi.IAnnouncement;

@Component({
  selector: "edit-announcement-modal",
  templateUrl: require("./EditAnnouncementModal.template.pug")
})
export class EditAnnouncementModalComponent implements OnInit {
  private _announcementId: number;
  private _announcementsClient: AnnouncementsClient;
  private _dialogRef: MatDialogRef<EditAnnouncementModalComponent>;
  private _matSnackBar: MatSnackBar;
  private _dialog: ConfirmDialogService;

  public editedAnnouncement: IAnnouncement;
  public messageControl: FormControl = new FormControl("", [Validators.required]);

  public get isFormOk(): boolean {
    return this.messageControl.valid;
  }

  constructor(@Inject(MAT_DIALOG_DATA) announcementId: number,
              announcementsClient: AnnouncementsClient,
              dialogRef: MatDialogRef<EditAnnouncementModalComponent>,
              matSnackBar: MatSnackBar,
              dialog: ConfirmDialogService) {
    this._announcementId = announcementId;
    this._announcementsClient = announcementsClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;
    this._dialog = dialog;
  }

  public async ngOnInit() {
    if (this._announcementId != null) {
      this.editedAnnouncement = await this._announcementsClient.get(this._announcementId);
    }

    this.initFields();
  }

  public initFields() {
    if (this.editedAnnouncement == null) {
      this.editedAnnouncement = {} as IAnnouncement;
      this.editedAnnouncement.Message = "";
    }

    this.messageControl.setValue(this.editedAnnouncement.Message);
  }

  public async save() {
    if (this.isFormOk) {
      let announcement: IAnnouncement = {} as IAnnouncement;
      let persistedAnnouncement: IAnnouncement;

      Object.assign(announcement, this.editedAnnouncement);
      announcement.Message = this.messageControl.value;

      if (this._announcementId == null) {
        persistedAnnouncement = await this._announcementsClient.post(announcement);
      } else {
        persistedAnnouncement = await this._announcementsClient.put(this._announcementId, announcement);
      }

      if (persistedAnnouncement == null) {
        this._matSnackBar.open("Could not save announcement, check your input", "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  public deleteAnnouncement() {
    if (this._announcementId != null) {
      this._dialog.confirm("Are you sure you want to delete this announcement?")
        .filter((confirmed: boolean) => confirmed)
        .subscribe(async () => {
          let success: boolean = await this._announcementsClient.delete(this._announcementId);
          if (success == null) {
            this._matSnackBar.open("Could not delete announcement, does it still exist?", "Ok");
          } else {
            this._dialogRef.close(true);
          }
        });
    }
  }

  public cancelEdit() {
    this._dialogRef.close(false);
  }
}
