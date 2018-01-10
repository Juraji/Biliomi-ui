import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import IUser = Biliomi.IUser;

@Component({
  selector: "user-display",
  templateUrl: require("./UserDisplay.template.pug")
})
export class UserDisplayComponent implements OnInit {

  @Input("user")
  public user: IUser;

  @Input("displayUserGroup")
  public displayUserGroup: boolean = true;

  @HostBinding("hidden")
  public isHidden: boolean = true;

  @HostBinding("class.text-not-ok")
  public get isUserBlacklisted(): boolean {
    return this.user.BlacklistedSince != null;
  }

  @HostBinding("class.text-primary")
  public get isUserCaster(): boolean {
    return this.user.Caster;
  }

  @HostBinding("class.text-secondary")
  public get isUserModerator(): boolean {
    return this.user.Moderator;
  }

  public ngOnInit() {
    if (this.user != null) {
      this.isHidden = false;
    }
  }
}
