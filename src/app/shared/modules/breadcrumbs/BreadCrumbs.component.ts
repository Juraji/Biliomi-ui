import {Component, OnInit} from "@angular/core";
import {CrumbsService} from "./services/Crumbs.service";
import {VersionInfoClient} from "../biliomi/clients/VersionInfo.client";

@Component({
  selector: "bread-crumbs",
  templateUrl: require("./BreadCrumbs.template.pug"),
  styleUrls: [require("./BreadCrumbs.less").toString()]
})
export class BreadCrumbsComponent implements OnInit {
  private _crumbsService: CrumbsService;
  private _versionInfoClient: VersionInfoClient;

  constructor(crumbsService: CrumbsService, versionInfoClient: VersionInfoClient) {
    this._crumbsService = crumbsService;
    this._versionInfoClient = versionInfoClient;
  }

  public ngOnInit(): void {
    this._versionInfoClient.load();
  }
}
