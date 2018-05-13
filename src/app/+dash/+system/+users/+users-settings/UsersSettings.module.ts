import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { UsersSettingsComponent } from "./UsersSettings.component";
import { UserGroupsComponent } from "./declarations/UserGroups.component";
import { EditUserGroupModalComponent } from "./declarations/EditUserGroupModal.component";
import { FollowersComponent } from "./declarations/Followers.component";
import { SubscribersComponent } from "./declarations/Subscribers.component";

const ROUTES: Routes = [
    {
        path: "",
        component: UsersSettingsComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        UsersSettingsComponent,
        UserGroupsComponent,
        EditUserGroupModalComponent,
        FollowersComponent,
        SubscribersComponent
    ],
    entryComponents: [
        EditUserGroupModalComponent
    ]
})
export class UsersSettingsModule {
}
