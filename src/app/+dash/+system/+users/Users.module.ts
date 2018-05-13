import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./Users.component";
import { SharedModule } from "../../../shared/Shared.module";

const ROUTES: Routes = [
    {
        path: "",
        component: UsersComponent,
        children: [
            {
                path: "overview",
                loadChildren: "./+user-overview/UserOverview.module#UserOverviewModule",
                data: {crumbName: "Overview"}
            },
            {
                path: "edit",
                loadChildren: "./+edit-user/EditUser.module#EditUserModule",
                data: {crumbName: "Edit User", hideFromMenu: true}
            },
            {
                path: "users-settings",
                loadChildren: "./+users-settings/UsersSettings.module#UsersSettingsModule",
                data: {crumbName: "Settings"}
            },
            {
                path: "hosts",
                loadChildren: "./+hosts/Hosts.module#HostsModule",
                data: {crumbName: "Hosts"}
            },
            {
                path: "donations",
                loadChildren: "./+donations/Donations.module#DonationsModule",
                data: {crumbName: "Donations"}
            },
            {
                path: "greetings",
                loadChildren: "./+greetings/Greetings.module#GreetingsModule",
                data: {crumbName: "Greetings"}
            }
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        UsersComponent
    ]
})
export class UsersModule {
}
