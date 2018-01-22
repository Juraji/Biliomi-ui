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
import {CommandHistoryRecordsClient} from "./clients/model/CommandHistoryRecords.client";
import {InvestmentRecordsClient} from "./clients/model/InvestmentRecords.client";
import {InvestmentSettingsClient} from "./clients/settings/InvestmentSettings.client";
import {KillRecordsClient} from "./clients/model/KillRecords.client";
import {QuotesClient} from "./clients/model/Quotes.client";
import {RaidRecordsClient} from "./clients/model/RaidRecords.client";
import {RouletteRecordsClient} from "./clients/model/RouletteRecords.client";
import {RouletteSettingsClient} from "./clients/settings/RouletteSettings.client";
import {SpotifySettingsClient} from "./clients/settings/SpotifySettings.client";
import {TwitterSettingsClient} from "./clients/settings/TwitterSettings.client";
import {SteamSettingsClient} from "./clients/settings/SteamSettings.client";
import {VersionInfoClient} from "./clients/VersionInfo.client";
import {UserGreetingSettingsClient} from "./clients/settings/UserGreetingSettings.client";
import {UserGreetingsClient} from "./clients/model/UserGreetings.client";

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
  CommandHistoryRecordsClient,
  CommandsClient,
  CommunitiesClient,
  CustomCommandsClient,
  DonationsClient,
  GamesClient,
  HostRecordsClient,
  InvestmentRecordsClient,
  KillRecordsClient,
  LatestFollowersClient,
  LatestSubscribersClient,
  ModerationRecordsClient,
  QuotesClient,
  RaidRecordsClient,
  RouletteRecordsClient,
  TemplatesClient,
  UserGreetingsClient,
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
  InvestmentSettingsClient,
  PointsSettingsClient,
  RouletteSettingsClient,
  SpotifySettingsClient,
  SteamSettingsClient,
  SubscriberWatchSettingsClient,
  SystemSettingsClient,
  TimeTrackingSettingsClient,
  TwitterSettingsClient,
  UserGreetingSettingsClient,

  // Non-REST clients
  ChannelStatusClient,
  HostersClient,
  VersionInfoClient,
  ViewersClient
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
    };
  }
}
