import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import IUser = Biliomi.IUser;

@Component({
  selector: "user-display",
  templateUrl: require("./UserDisplay.template.pug"),
})
export class UserDisplayComponent implements OnInit {

  @Input("user")
  public user: IUser;

  @Input("displayUserGroup")
  public displayUserGroup: boolean = true;

  @HostBinding("hidden")
  public isHidden: boolean = true;

  public get usernameColorClass(): string {
    if (this.user != null) {
      if (this.user.BlacklistedSince != null) {
        return "text-not-ok";
      } else if (this.user.Caster) {
        return "text-primary";
      } else if (this.user.Moderator) {
        return "text-secondary";
      }
    }

    return "";
  }

  public ngOnInit() {
    if (this.user != null) {
      this.isHidden = false;
    }
  }
}
