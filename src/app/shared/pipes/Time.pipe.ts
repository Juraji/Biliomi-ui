import {Pipe, PipeTransform} from "@angular/core";
import {TimeUtils} from "../modules/tools/TimeUtils";

@Pipe({name: "time"})
export class TimePipe implements PipeTransform {
  public transform(value: number, useLargeScale: boolean = false, hoursOnly: boolean = false, fromHours?: boolean): any {
    if (value == null) {
      return value;
    }

    if (fromHours) {
      value = value * 3600000;
    }

    if (useLargeScale) {
      return TimeUtils.millisToRelTimeStrYMD(value, true);
    } else {
      return TimeUtils.millisToRelTimeStrHMS(value, hoursOnly, true);
    }
  }
}
