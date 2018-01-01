import {Component, HostBinding} from "@angular/core";
import {VoiceCommandsService} from "./services/VoiceCommands.service";
import {VCMessagesService} from "./services/VCMessages.service";

@Component({
  selector: "voice-commands",
  templateUrl: require("./VoiceCommands.template.pug"),
  styleUrls: [require("./VoiceCommands.less").toString()]
})
export class VoiceCommandsComponent {
  public voiceCommandsService: VoiceCommandsService;
  public vcMessagesService: VCMessagesService;

  @HostBinding("class.alert")
  public get hasMessage(): boolean {
    return this.vcMessagesService.hasMessage;
  }

  constructor(voiceCommandsService: VoiceCommandsService,
              vcMessagesService: VCMessagesService) {
    this.voiceCommandsService = voiceCommandsService;
    this.vcMessagesService = vcMessagesService;
  }

  public startStopListening() {
    if (!this.voiceCommandsService.isListening) {
      this.voiceCommandsService.start();
    } else {
      this.voiceCommandsService.stop();
    }
  }
}
