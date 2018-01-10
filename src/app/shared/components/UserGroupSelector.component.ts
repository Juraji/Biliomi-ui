import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UserGroupsClient} from "../modules/biliomi/clients/model/UserGroups.client";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import IUserGroup = Biliomi.IUserGroup;

@Component({
  selector: "user-group-selector",
  templateUrl: require("./UserGroupSelector.template.pug")
})
export class UserGroupSelectorComponent implements OnInit {
  private _userGroupsClient: UserGroupsClient;
  private _userGroupControl: FormControl = new FormControl(null);
  private _required: boolean;

  @Output("userGroupChange")
  public userGroupChange: EventEmitter<IUserGroup> = new EventEmitter<IUserGroup>();

  @Input("userGroup")
  public get userGroup(): IUserGroup {
    return this._userGroupControl.value;
  }

  public set userGroup(value: IUserGroup) {
    this._userGroupControl.setValue(value);
  }

  @Input("required")
  public get required(): boolean {
    return this._required;
  }

  public set required(value: boolean) {
    this._required = value;
    if (value) {
      this._userGroupControl.setValidators(Validators.required);
    } else {
      this._userGroupControl.clearValidators();
    }
  }

  @Input("placeholder")
  public placeholder: string = "User Group";

  constructor(userGroupsClient: UserGroupsClient) {
    this._userGroupsClient = userGroupsClient;
    this._userGroupControl.valueChanges
      .subscribe((g: IUserGroup) => this.userGroupChange.next(g));
  }

  public async ngOnInit() {
    await this._userGroupsClient.load(true);
    if (this._userGroupControl.value == null) {
      // If the control is empty select the default group
      this._userGroupControl.setValue(this._userGroupsClient.getDefaultGroup());
    } else {
      // reselect the set user group from the client cache, so the object reference matches the list
      let id = this._userGroupControl.value.Id;
      this._userGroupControl.setValue(this._userGroupsClient.searchCacheById(id));
    }
  }
}
