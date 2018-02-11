import {Component, OnInit, ViewChild} from "@angular/core";
import {ChatLogsClient} from "../../../../shared/modules/biliomi/clients/model/ChatLogs.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import ILogInfo = Biliomi.ILogInfo;
import {MatSidenav} from "@angular/material";

import "./ChatLogs.less";

@Component({
  selector: "chat-logs-component",
  templateUrl: require("./ChatLogs.template.html")
})
export class ChatLogsComponent implements OnInit {
  private _chatLogsClient: ChatLogsClient;
  private _currentLogFilename: string;
  private logsArchive: string[];
  private currentLog: ILogInfo;

  @ViewChild("sideNav")
  private sideNav: MatSidenav;

  constructor(chatLogsClient: ChatLogsClient) {
    this._chatLogsClient = chatLogsClient;
  }

  public async ngOnInit() {
    this.loadArchive();
    this.loadLogFile(null);
  }

  public async loadArchive() {
    this.logsArchive = await this._chatLogsClient.getArchiveLogFiles();
  }

  public refreshCurrentLog() {
    this.loadLogFile(this._currentLogFilename);
  }

  public async loadLogFile(filename: string) {
    this.sideNav.close();
    this._currentLogFilename = filename;
    if (filename == null) {
      this.currentLog = await this._chatLogsClient.getLatestLog();
    } else {
      this.currentLog = await this._chatLogsClient.getArchivedLog(filename);
    }
  }
}
