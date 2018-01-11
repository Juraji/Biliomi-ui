import {ModuleWithProviders, NgModule, Type} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BiliomiApiService} from "./services/BiliomiApi.service";
import {ChannelStatusClient} from "./clients/ChannelStatus.client";
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
import {ChatModeratorSettingsClient} from "./clients/settings/ChatModeratorSettings.client";
import {ModerationRecordsClient} from "./clients/model/ModerationRecords.client";
import {HostWatchSettingsClient} from "./clients/settings/HostWatchSettings.client";
import {LatestFollowersClient} from "./clients/model/LatestFollowers.client";
import {LatestSubscribersClient} from "./clients/model/LatestSubscribers.client";
import {CommunitiesClient} from "./clients/model/Communities.client";
import {CommunitiesSettingsClient} from "./clients/settings/CommunitiesSettings.client";
import {AchievementRecordsClient} from "./clients/model/AchievementRecords.client";
import {AchievementSettingsClient} from "./clients/settings/AchievementSettings.client";
import {AdventureRecordsClient} from "./clients/model/AdventureRecords.client";
import {AdventureSettingsClient} from "./clients/settings/AdventureSettings.client";
import {ViewersClient} from "./clients/Viewers.client";
import {HostersClient} from "./clients/Hosters.client";
import {AnnouncementsClient} from "./clients/model/Announcements.client";
import {AnnouncementSettingsClient} from "./clients/settings/AnnouncementSettings.client";
import {DonationsClient} from "./clients/model/Donations.client";

const BILIOMI_EXPORTS: Type<any>[] = [
  // Pipes
  PointsPipe
];

const BILIOMI_PROVIDERS: Type<any>[] = [
  BiliomiApiService,
  BiliomiEventsService,

  // Model clients
  AchievementRecordsClient,
  AdventureRecordsClient,
  AnnouncementsClient,
  ChatLogsClient,
  CommandsClient,
  CommunitiesClient,
  CustomCommandsClient,
  DonationsClient,
  GamesClient,
  HostRecordsClient,
  LatestFollowersClient,
  LatestSubscribersClient,
  ModerationRecordsClient,
  TemplatesClient,
  UserGroupsClient,
  UsersClient,

  // Settings clients
  AchievementSettingsClient,
  AdventureSettingsClient,
  AnnouncementSettingsClient,
  ChatModeratorSettingsClient,
  CommunitiesSettingsClient,
  FollowerWatchSettingsClient,
  HostWatchSettingsClient,
  PointsSettingsClient,
  SubscriberWatchSettingsClient,
  SystemSettingsClient,
  TimeTrackingSettingsClient,

  // Non-REST clients
  ChannelStatusClient,
  ViewersClient,
  HostersClient
];

@NgModule({
  imports: [HttpClientModule],
  declarations: BILIOMI_EXPORTS,
  exports: BILIOMI_EXPORTS
})
export class BiliomiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BiliomiModule,
      providers: BILIOMI_PROVIDERS
    }
  }
}
