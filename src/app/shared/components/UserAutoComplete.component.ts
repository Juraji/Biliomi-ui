import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UsersClient} from "../modules/biliomi/clients/model/Users.client";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import {StringUtils} from "../modules/tools/StringUtils";
import IUser = Biliomi.IUser;

@Component({
  selector: "user-autocomplete",
  templateUrl: require("./UserAutoComplete.template.pug")
})
export class UserAutoCompleteComponent implements OnInit {
  private usersClient: UsersClient;
  private usernameControl: FormControl = new FormControl("");
  private _selectedUser: IUser;
  private _required: boolean;

  @Output("userChange")
  public userChange: EventEmitter<IUser> = new EventEmitter<IUser>();

  @Input("user")
  public get user(): IUser {
    return this._selectedUser;
  }

  public set user(user: IUser) {
    if (user != null) {
      this._selectedUser = this.usersClient
        .searchCache(user.Username)
        .pop();
      this.usernameControl.setValue(user.DisplayName);
    } else {
      this._selectedUser = null;
      this.usernameControl.setValue("");
      this.usernameControl.setErrors(null);
    }
  }

  @Input("required")
  public get required(): boolean {
    return this._required;
  }

  public set required(state: boolean) {
    this._required = state;
    if (state) {
      this.usernameControl.setValidators(Validators.required);
    } else {
      this.usernameControl.clearValidators();
    }
  }

  public get valid(): boolean {
    return this.usernameControl.valid && !this.inputIsUnknownUser;
  }

  public get inputIsUnknownUser(): boolean {
    return this._selectedUser == null
      && this.usernameControl.dirty;
  }

  constructor(usersClient: UsersClient) {
    this.usersClient = usersClient;
  }

  public ngOnInit() {
    this.usersClient.load(true);
    this.usernameControl.valueChanges.subscribe((username: string) => {
      this._selectedUser = this.usersClient
        .searchCache(username)
        .sort((a: IUser, b: IUser) => b.Username.length - a.Username.length)
        .pop();

      if (this._selectedUser == null) {
        this.usernameControl.setErrors({unknownUser: true});
      }
    });
  }

  public async performApiSearch() {
    let input = this.usernameControl.value;
    if (this._selectedUser == null && StringUtils.isNotEmpty(input)) {
      let user = await
        this.usersClient.getUserByUsername(input);

      if (user != null) {
        this.usernameControl.setValue(user.DisplayName);
        this._selectedUser = user;
      } else {
        this.usernameControl.setErrors({unknownUser: true});
      }
    }
  }
}
