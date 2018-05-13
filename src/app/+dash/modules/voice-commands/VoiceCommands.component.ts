import { Component, HostBinding, OnDestroy } from "@angular/core";
import { VoiceCommandsService } from "./services/VoiceCommands.service";
import { VCMessagesService } from "./services/VCMessages.service";

import "./VoiceCommands.less";

@Component({
    selector: "voice-commands",
    templateUrl: require("./VoiceCommands.template.html")
})
export class VoiceCommandsComponent implements OnDestroy {
    public voiceCommandsService: VoiceCommandsService;
    public vcMessagesService: VCMessagesService;

    constructor(voiceCommandsService: VoiceCommandsService,
                vcMessagesService: VCMessagesService) {
        this.voiceCommandsService = voiceCommandsService;
        this.vcMessagesService = vcMessagesService;
    }

    @HostBinding("class.alert")
    public get hasMessage(): boolean {
        return this.vcMessagesService.hasMessage;
    }

    public ngOnDestroy() {
        this.voiceCommandsService.stop();
    }

    public startStopListening() {
        if (!this.voiceCommandsService.isListening) {
            this.voiceCommandsService.start();
        } else {
            this.voiceCommandsService.stop();
        }
    }
}
