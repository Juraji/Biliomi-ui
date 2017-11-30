import {Component, OnInit} from "@angular/core";
import {UserGroupsClient} from "../modules/biliomi/clients/model/UserGroups.client";
import {FormControl, Validators} from "@angular/forms";
import {DefaultFormFieldStateMatcher} from "../modules/ng-material/classes/DefaultFormFieldStateMatcher.class";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import IUserGroup = Biliomi.IUserGroup;
import {SortBuilder} from "../modules/biliomi/classes/SortBuilder";

@Component({
  selector: "user-group-select",
  templateUrl: require("./UserGroupSelect.template.pug")
})
export class UserGroupSelectComponent implements OnInit {
  private userGroupsClient: UserGroupsClient;
  private fieldMatcher: DefaultFormFieldStateMatcher = new DefaultFormFieldStateMatcher();
  private userGroupControl: FormControl = new FormControl(null, [Validators.required]);

  constructor(userGroupsClient: UserGroupsClient) {
    this.userGroupsClient = userGroupsClient;
  }

  public async ngOnInit() {
    let groupSort = new SortBuilder()
      .add("DefaultGroup", true)
      .add("Name", false, true);

    await this.userGroupsClient.load(true, groupSort);
    this.userGroupControl.setValue(this.userGroupsClient.getDefaultGroup());
  }

  public get selectedGroup(): IUserGroup {
    return this.userGroupControl.value;
  }

  public set selectedGroup(group: IUserGroup) {
    // Since we need the actual object reference we'll search the cache for the corresponding usergroup.
    let sGroup = this.userGroupsClient.getCache()
      .filter((g:IUserGroup)=>g.Id == group.Id)
      .pop();
    this.userGroupControl.setValue(sGroup);
  }
}
