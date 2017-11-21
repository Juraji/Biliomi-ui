import {NgModule, Type} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ServicesLibrary} from "../../classes/abstract/ServicesLibrary";
import {BiliomiApiService} from "./services/BiliomiApi.service";
import {ChannelInfoClient} from "./clients/settings/ChannelInfo.client";
import {UsersClient} from "./clients/model/Users.client";
import {GamesClient} from "./clients/model/Games.client";
import {BiliomiEventsService} from "./services/BiliomiEvents.service";

const BILIOMI_EXPORTS: Type<any>[] = [];

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

      // Settings clients
      ChannelInfoClient
    ]);
  }

  public static forRoot(): BiliomiModule {
    return new BiliomiModule;
  }
}
