import {NgModule, Type} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ServicesLibrary} from "../../classes/abstract/ServicesLibrary";
import {BiliomiApiService} from "./services/BiliomiApi.service";

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
      BiliomiApiService
    ]);
  }

  public static forRoot(): BiliomiModule {
    return new BiliomiModule;
  }
}
