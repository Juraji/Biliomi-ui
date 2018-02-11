import {Component, Input, OnInit, Optional} from "@angular/core";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {UsersClient} from "../../../../../shared/modules/biliomi/clients/model/Users.client";
import {FormControl, Validators} from "@angular/forms";
import * as moment from "moment";
import {EditUserComponent} from "../EditUser.component";
import IUser = Biliomi.IUser;
import IUserGroup = Biliomi.IUserGroup;

@Component({
  selector: "user-base-information",
  templateUrl: require("./UserBaseInformation.template.html")
})
export class UserBaseInformationComponent implements OnInit {
  private _usersClient: UsersClient;
  private _user: IUser;

  public userGroup: IUserGroup;
  public titleControl: FormControl = new FormControl();
  public pointsControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public recordedTimeControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  public isBlacklistedControl: FormControl = new FormControl(false);
  public followDateControl: FormControl = new FormControl();
  public subscribeDateControl: FormControl = new FormControl();
  public editUserComponent: EditUserComponent;

  @Input("user")
  public get user(): IUser {
    return this._user;
  }

  public set user(user: IUser) {
    this._user = user;
  }

  constructor(@Optional() editUserComponent: EditUserComponent, usersClient: UsersClient) {
    this._usersClient = usersClient;
    this.editUserComponent = editUserComponent;

    this.followDateControl.disable();
    this.subscribeDateControl.disable();
  }

  public ngOnInit() {
    this.initFields();
  }

  public initFields() {
    this.userGroup = this._user.UserGroup;
    this.titleControl.reset(this._user.Title);
    this.pointsControl.reset(this._user.Points);
    this.recordedTimeControl.reset(this._user.RecordedTime);
    this.isBlacklistedControl.reset(this._user.BlacklistedSince != null);

    if (this._user.Follower) {
      this.followDateControl.reset(this._user.FollowDate);
    }

    if (this._user.Subscriber) {
      this.subscribeDateControl.reset(this._user.SubscribeDate);
    }
  }

  public get isFormOk(): boolean {
    return this.pointsControl.valid &&
      this.recordedTimeControl.valid;
  }

  public async save(): Promise<boolean> {
    if (this.isFormOk) {
      let user: IUser = {...this._user};
      let persistedUser: IUser;

      user.Title = this.titleControl.value;
      user.Points = this.pointsControl.value;
      user.RecordedTime = this.recordedTimeControl.value;
      user.UserGroup = this.userGroup;

      if (this.isBlacklistedControl.value === true && this._user.BlacklistedSince == null) {
        user.BlacklistedSince = moment().format();
      } else if (this.isBlacklistedControl.value === false) {
        user.BlacklistedSince = null;
      }

      if (this._user.Follower && this._user.FollowDate !== this.followDateControl.value.toString()) {
        user.FollowDate = this.followDateControl.value;
      }

      if (this._user.Subscriber && this._user.SubscribeDate !== this.subscribeDateControl.value.toString()) {
        user.SubscribeDate = this.subscribeDateControl.value;
      }

      persistedUser = await this._usersClient.put(this._user.Id, user);
      if (persistedUser != null) {
        this._user = persistedUser;
        this.initFields();
      }

      return persistedUser != null;
    }

    return null;
  }
}
