import {AfterViewInit, Component} from "@angular/core";
import {Dictionary} from "../../../shared/modules/tools/FunctionalInterface";
import * as moment from "moment-timezone";
import Moment = moment.Moment;

import "./ClockCard.less";

@Component({
  selector: "clock-card-component",
  templateUrl: require("./ClockCard.template.pug")
})
export class ClockCardComponent implements AfterViewInit {
  private timeZoneText: string;
  private clockHands: Dictionary = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  constructor() {
    this.timeZoneText = moment().tz(moment.tz.guess()).format("z");
  }

  public ngAfterViewInit() {
    // Add 1 second, to account for SVG's delayed start
    let now: Moment = moment().add(1, "second");
    this.clockHands.hours = 30 * now.hours() + now.minutes() / 2;
    this.clockHands.minutes = 6 * now.minutes() + now.seconds() / 10;
    this.clockHands.seconds = 6 * now.seconds();
  }
}
