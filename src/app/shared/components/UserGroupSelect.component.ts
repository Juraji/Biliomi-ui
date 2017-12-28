import {Component, Input, OnInit} from "@angular/core";
import {UserGroupsClient} from "../modules/biliomi/clients/model/UserGroups.client";
import {FormControl, Validators} from "@angular/forms";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import IUserGroup = Biliomi.IUserGroup;

@Component({
  selector: "user-group-select",
  templateUrl: require("./UserGroupSelect.template.pug")
})
export class UserGroupSelectComponent {
  private userGroupsClient: UserGroupsClient;
  private userGroupControl: FormControl = new FormControl(null, [Validators.required]);

  @Input("placeholder")
  public inputPlaceholder: string = "User Group";

  constructor(userGroupsClient: UserGroupsClient) {
    this.userGroupsClient = userGroupsClient;
    this.userGroupsClient.load(true).then(() => {
      if (this.userGroupControl.value == null) {
        this.userGroupControl.setValue(this.userGroupsClient.getDefaultGroup());
      }
    });
  }

  public get selectedGroup(): IUserGroup {
    return this.userGroupControl.value;
  }

  public set selectedGroup(group: IUserGroup) {
    if (group) {
      this.userGroupsClient.load().then(() => {
        // Since we need the actual object reference we'll search the cache for the corresponding usergroup.
        let sGroup = this.userGroupsClient
          .searchCacheByPredicate((g: IUserGroup) => g.Id === group.Id)
          .pop();
        this.userGroupControl.setValue(sGroup);
      });
    }
  }
}
