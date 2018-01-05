import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/Shared.module";
import {VoiceCommandsComponent} from "./VoiceCommands.component";
import {VoiceCommandsService} from "./services/VoiceCommands.service";
import {VCMessagesService} from "./services/VCMessages.service";

@NgModule({
  imports: [SharedModule],
  declarations: [VoiceCommandsComponent],
  providers: [
    VoiceCommandsService,
    VCMessagesService
  ],
  exports: [VoiceCommandsComponent]
})
export class VoiceCommandsModule {
}
