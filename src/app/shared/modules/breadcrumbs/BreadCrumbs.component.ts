import {Component} from "@angular/core";
import {CrumbsService} from "./services/Crumbs.service";

@Component({
  selector: "bread-crumbs",
  templateUrl: require("./BreadCrumbs.template.pug"),
  styleUrls: [require("./BreadCrumbs.less").toString()]
})
export class BreadCrumbsComponent {
  private _crumbsService: CrumbsService;

  constructor(crumbsService: CrumbsService) {
    this._crumbsService = crumbsService;
  }
}
