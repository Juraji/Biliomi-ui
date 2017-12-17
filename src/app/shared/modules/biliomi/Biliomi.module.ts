import {ModuleWithProviders, NgModule, Type} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BiliomiApiService} from "./services/BiliomiApi.service";
import {ChannelInfoClient} from "./clients/settings/ChannelInfo.client";
import {UsersClient} from "./clients/model/Users.client";
import {GamesClient} from "./clients/model/Games.client";
import {BiliomiEventsService} from "./services/BiliomiEvents.service";
import {SystemSettingsClient} from "./clients/settings/SystemSettings.client";
import {CustomCommandsClient} from "./clients/model/CustomCommands.client";
import {PointsPipe} from "./pipes/Points.pipe";
import {PointsSettingsClient} from "./clients/settings/PointsSettings.client";
import {CommandsClient} from "./clients/model/Commands.client";
import {UserGroupsClient} from "./clients/model/UserGroups.client";
import {TimeTrackingSettingsClient} from "./clients/settings/TimeTrackingSettings.client";
import {TemplatesClient} from "./clients/model/Templates.client";
import {ChatLogsClient} from "./clients/model/ChatLogs.client";
import {FollowerWatchSettingsClient} from "./clients/settings/FollowerWatchSettings.client";
import {SubscriberWatchSettingsClient} from "./clients/settings/SubscriberWatchSettings.client";
import {HostRecordsClient} from "./clients/model/HostRecords.client";
import {Provider} from "@angular/core/src/di";
import {ChatModeratorSettingsClient} from "./clients/settings/ChatModeratorSettings.client";
import {ModerationRecordsClient} from "./clients/model/ModerationRecords.client";

const BILIOMI_EXPORTS: Type<any>[] = [
  // Pipes
  PointsPipe
];

@NgModule({
  imports: [HttpClientModule],
  declarations: BILIOMI_EXPORTS,
  exports: BILIOMI_EXPORTS
})
export class BiliomiModule implements ModuleWithProviders {
  public ngModule: Type<any> = BiliomiModule;
  public providers: Provider[] = [
    BiliomiApiService,
    BiliomiEventsService,

    // Model clients
    ChatLogsClient,
    CommandsClient,
    CustomCommandsClient,
    GamesClient,
    HostRecordsClient,
    ModerationRecordsClient,
    TemplatesClient,
    UserGroupsClient,
    UsersClient,

    // Settings clients
    ChannelInfoClient,
    ChatModeratorSettingsClient,
    FollowerWatchSettingsClient,
    PointsSettingsClient,
    SubscriberWatchSettingsClient,
    SystemSettingsClient,
    TimeTrackingSettingsClient
  ];

  public static forRoot(): BiliomiModule {
    return new BiliomiModule;
  }
}
