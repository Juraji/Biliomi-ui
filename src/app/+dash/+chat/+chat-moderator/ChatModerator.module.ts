import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/Shared.module";
import { ChatModeratorComponent } from "./ChatModerator.component";

const ROUTES: Routes = [
    {
        path: "",
        component: ChatModeratorComponent,
        children: [
            {
                path: "chat-moderator-settings",
                loadChildren: "./+chat-moderator-settings/ChatModeratorSettings.module#ChatModeratorSettingsModule",
                data: {crumbName: "Settings"}
            },
            {
                path: "chat-moderator-records",
                loadChildren: "./+chat-moderator-records/ChatModeratorRecords.module#ChatModeratorRecordsModule",
                data: {crumbName: "Records"}
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
        ChatModeratorComponent
    ],
    entryComponents: []
})
export class ChatModeratorModule {
}
