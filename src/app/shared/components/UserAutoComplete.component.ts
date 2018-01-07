import {Component, Input, OnInit} from "@angular/core";
import {UsersClient} from "../modules/biliomi/clients/model/Users.client";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import IUser = Biliomi.IUser;

@Component({
  selector: "user-autocomplete",
  templateUrl: require("./UserAutoComplete.template.pug")
})
export class UserAutoCompleteComponent implements OnInit {
  private usersClient: UsersClient;
  private usernameControl: FormControl = new FormControl("");

  @Input("required")
  public required: boolean = false;

  @Input("allowUnknownUsers")
  public allowUnknownUsers: boolean = true;

  public set selectedUser(user: IUser) {
    if (user != null) {
      this.usernameControl.setValue(user.DisplayName);
    }
  }

  constructor(usersClient: UsersClient) {
    this.usersClient = usersClient;
  }

  public ngOnInit() {
    if (this.required) {
      this.usernameControl.setValidators(Validators.required);
    }

    this.usersClient.load(true);
  }

  public get valid(): boolean {
    return this.usernameControl.valid;
  }

  public reset() {
    this.usernameControl.reset();
    this.usernameControl.setErrors(null);
  }

  public async getSelectedUser(): Promise<IUser> {
    let selectedUser: IUser = this.usersClient
      .searchCacheByPredicate((u: IUser) => u.DisplayName === this.usernameControl.value)
      .pop();

    if (selectedUser == null && this.allowUnknownUsers) {
      selectedUser = await this.usersClient.getUserByUsername(this.usernameControl.value, true);

      if (selectedUser == null) {
        this.usernameControl.setErrors({"unknownUser": true});
      }
    }

    return selectedUser;
  }
}
