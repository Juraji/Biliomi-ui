import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserGroupsClient } from "../modules/biliomi/clients/model/UserGroups.client";
import { Biliomi } from "../modules/biliomi/classes/interfaces/Biliomi";
import { FormControl, Validators } from "@angular/forms";
import IUserGroup = Biliomi.IUserGroup;

@Component({
    selector: "user-group-selector",
    templateUrl: require("./UserGroupSelector.template.html")
})
export class UserGroupSelectorComponent implements OnInit {
    @Output("userGroupChange")
    public userGroupChange: EventEmitter<IUserGroup> = new EventEmitter<IUserGroup>();
    @Input("placeholder")
    public placeholder: string = "User Group";
    private _userGroupsClient: UserGroupsClient;
    private _userGroupControl: FormControl = new FormControl(null);

    constructor(userGroupsClient: UserGroupsClient) {
        this._userGroupsClient = userGroupsClient;
        this._userGroupControl.valueChanges
            .subscribe((g: IUserGroup) => this.userGroupChange.next(g));
    }

    private _required: boolean;

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

    @Input("userGroup")
    public get userGroup(): IUserGroup {
        return this._userGroupControl.value;
    }

    public set userGroup(value: IUserGroup) {
        if (value != null) {
            this._userGroupsClient.load()
                .then(() => this._userGroupControl.setValue(this._userGroupsClient.searchCacheById(value.Id)));
        } else {
            this._userGroupControl.reset(value);
        }
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
