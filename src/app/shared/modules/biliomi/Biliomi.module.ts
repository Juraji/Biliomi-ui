import {NgModule, Type} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ServicesLibrary} from "../../classes/abstract/ServicesLibrary";
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

const BILIOMI_EXPORTS: Type<any>[] = [
  // Pipes
  PointsPipe
];

@NgModule({
  imports: [HttpClientModule],
  declarations: BILIOMI_EXPORTS,
  exports: BILIOMI_EXPORTS
})
export class BiliomiModule extends ServicesLibrary {

  constructor() {
    super(BiliomiModule);

    this.providers.push([
      BiliomiApiService,
      BiliomiEventsService,

      // Model clients
      UsersClient,
      GamesClient,
      CustomCommandsClient,
      CommandsClient,
      UserGroupsClient,
      TemplatesClient,

      // Settings clients
      ChannelInfoClient,
      SystemSettingsClient,
      PointsSettingsClient,
      TimeTrackingSettingsClient
    ]);
  }

  public static forRoot(): BiliomiModule {
    return new BiliomiModule;
  }
}
