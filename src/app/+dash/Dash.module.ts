import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/Shared.module";
import { RouterModule, Routes } from "@angular/router";
import { DashComponent } from "./Dash.component";
import { NavChannelStatusComponent } from "./declarations/NavChannelStatus.component";
import { NavAuthBarComponent } from "./declarations/NavAuthBar.component";
import { NavRemoteManagementComponent } from "./declarations/NavRemoteManagement.component";
import { ChatComponent } from "./declarations/Chat.component";
import { PowerManagementDialogComponent } from "./declarations/PowerManagementDialog.component";
import { PageLoadingBarComponent } from "./declarations/PageLoadingBar.component";
import { VoiceCommandsModule } from "./modules/voice-commands/VoiceCommands.module";

const ROUTES: Routes = [
    {
        path: "",
        component: DashComponent,
        children: [
            {
                path: "home",
                loadChildren: "./+home/Home.module#HomeModule",
                data: {crumbName: "Home"}
            },
            {
                path: "commands",
                loadChildren: "./+commands/Commands.module#CommandsModule",
                data: {crumbName: "Commands"}
            },
            {
                path: "system",
                loadChildren: "./+system/System.module#SystemModule",
                data: {crumbName: "System"}
            },
            {
                path: "chat",
                loadChildren: "./+chat/Chat.module#ChatModule",
                data: {crumbName: "Chat"}
            },
            {
                path: "games",
                loadChildren: "./+games/Games.module#GamesModule",
                data: {crumbName: "Games"}
            }
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        VoiceCommandsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        DashComponent,
        NavChannelStatusComponent,
        NavAuthBarComponent,
        NavRemoteManagementComponent,
        PowerManagementDialogComponent,
        PageLoadingBarComponent,
        ChatComponent
    ],
    entryComponents: [PowerManagementDialogComponent]
})
export class DashModule {
}
