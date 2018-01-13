import {Injectable, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";
import {BiliomiApiService} from "../../../../shared/modules/biliomi/services/BiliomiApi.service";
import {Observable} from "rxjs/Observable";
import {VCMessagesService} from "./VCMessages.service";
import {FilterBuilder} from "../../../../shared/modules/biliomi/classes/FilterBuilder";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {BrowserSpeechRecognition} from "../classes/BrowserSpeechRecognition";
import {DialogsService} from "../../../../shared/modules/dialogs/services/Dialogs.service";
import IRestFilterOperator = Biliomi.IRestFilterOperator;
import IPaginatedResponse = Biliomi.IPaginatedResponse;
import ICommand = Biliomi.ICommand;

const VOICE_COMMAND_TRIGGER_WORD: string = "panel";

@Injectable()
export class VoiceCommandsService {
  private _api: BiliomiApiService;
  private _router: Router;
  private _vcMessagesService: VCMessagesService;
  private _dialog: DialogsService;
  private _recognitionObj: SpeechRecognition = null;
  private _ngZone: NgZone;

  private _shouldStopListening: boolean = false;

  private _commands: IVoiceCommand[] = [
    {regex: /commands? ([a-z]+)/, executor: (command: string) => this.executorCommand(command)},
    {regex: /give everyone [^\d]?(\d+)/, executor: (amount: string) => this.executorPoints(amount)},
    {regex: /show ([a-z]+)/, executor: (pageName: string) => this.executorNavigate(pageName)},
    {regex: /(confirm|cancel)/, executor: (action: string) => this.confirmOrCancelModal(action)},
    {regex: /stop listening/, executor: () => this.stop()}
  ];

  private _voiceNavigationRoutes: IVoiceNavigationRoutes[] = [
    {commands: ["dash", "home"], path: "/dash/home"},
    {commands: ["users"], path: "/dash/system/users/overview"},
    {commands: ["followers"], path: "/dash/chat/followers"},
    {commands: ["commands"], path: "/dash/commands/custom-commands"}
  ];

  public get isListening(): boolean {
    return this._recognitionObj != null;
  }

  constructor(api: BiliomiApiService,
              router: Router,
              vcMessagesService: VCMessagesService,
              dialog: DialogsService,
              ngZone: NgZone) {
    this._api = api;
    this._router = router;
    this._vcMessagesService = vcMessagesService;
    this._dialog = dialog;
    this._ngZone = ngZone;
  }

  public start() {
    this._recognitionObj = BrowserSpeechRecognition.get();

    if (this._recognitionObj != null) {
      this._recognitionObj.continuous = true;
      this._recognitionObj.lang = "en-US";
      this._recognitionObj.maxAlternatives = 5;
      this._recognitionObj.onresult = (e: SpeechRecognitionEvent) => this.processSpeechResults(e);
      this._recognitionObj.onend = () => this.stopOrRestart();
      this._recognitionObj.start();
      this._vcMessagesService.notify("Listening for commands");
    } else {
      this._vcMessagesService.notify("Speech recognition is not supported by your browser");
    }
  }

  public stop() {
    if (this.isListening) {
      this._shouldStopListening = true;
      this._recognitionObj.abort();
    }
  }

  private stopOrRestart() {
    // Run in zone task, so the recognition thread doesn't stall the view
    this._ngZone.runTask(() => {
      if (!this._shouldStopListening) {
        this._recognitionObj.start();
      } else {
        this._shouldStopListening = false;
        this._vcMessagesService.notify("Stopped listening");
        this._recognitionObj = null;
      }
    }, this);
  }

  private processSpeechResults(e: SpeechRecognitionEvent) {
    let lastResult = e.results.item(e.results.length - 1);
    // Run in zone task, so the recognition thread doesn't stall the view
    this._ngZone.runTask((result: SpeechRecognitionResult) => {

      for (let i = 0; i < result.length; i++) {
        let currentTranscript = result.item(i).transcript.trim().toLowerCase();

        if (currentTranscript.startsWith(VOICE_COMMAND_TRIGGER_WORD)) {
          currentTranscript = currentTranscript.substr(VOICE_COMMAND_TRIGGER_WORD.length).trim();

          for (let command of this._commands) {
            let match: RegExpMatchArray = currentTranscript.match(command.regex);
            if (match) {
              let params = match.slice(1).map((p: string) => p.trim());
              command.executor.apply(this, params);
              return;
            }
          }
        }
      }

      this._vcMessagesService.notify("Sorry, I did not catch that");
      console.log("Heard: ", result.item(0).transcript);
    }, this, [lastResult]);
  }

  private openConfirmModal(message: string): Observable<boolean> {
    return this._dialog.confirm(
      message,
      "voice-command-confirm",
      "Say \"panel confirm\"",
      "Say \"panel cancel\""
    )
      .filter((confirmed: boolean) => confirmed);
  }

  private confirmOrCancelModal(action: string) {
    let dialogRef: MatDialogRef<any> = this._dialog.getDialogById("voice-command-confirm");
    if (dialogRef) {
      switch (action) {
        case "confirm":
          dialogRef.close(true);
          this._vcMessagesService.notify("Action confirmed");
          break;
        case "cancel":
          dialogRef.close(false);
          this._vcMessagesService.notify("Action canceled");
          break;
      }
    }
  }

  private executorPoints(amountString: string) {
    let amount = parseInt(amountString, 10);

    if (!isNaN(amount)) {
      this.openConfirmModal("Did you want to give everyone " + amount + " points?")
        .subscribe(() => this._api.postCommand("managepoints", "everyone", amount));
    }
  }

  private async executorCommand(command: string) {
    let apiParams: Map<string, any> = new Map<string, any>()
      .set("filter", new FilterBuilder()
        .add("command", IRestFilterOperator.CONTAINS, command)
        .toString());

    // Try finding custom command
    let commands = await this._api.get<IPaginatedResponse<ICommand>>("/core/customcommands", apiParams)
      || await this._api.get<IPaginatedResponse<ICommand>>("/core/commands", apiParams);

    if (commands == null) {
      this._vcMessagesService.notify("Command not found");
      return;
    }

    let foundCommand: ICommand = commands.Entities.shift();
    this.openConfirmModal("Execute command " + foundCommand.Command + " ?")
      .subscribe(() => this._api.postCommand(foundCommand.Command));
  }

  private executorNavigate(pageName: string) {
    for (let route of this._voiceNavigationRoutes) {
      if (route.commands.indexOf(pageName) > -1) {
        this._router.navigateByUrl(route.path);
        this._vcMessagesService.notify("Navigated to " + pageName);
        return;
      }
    }

    this._vcMessagesService.notify("Unknown page \"" + pageName + "\"");
  }
}
