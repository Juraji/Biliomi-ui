import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({name: "date"})
export class DatePipe implements PipeTransform {
    public transform(value: any, format: string = "MMMM Do Y, HH:mm"): string {
        if (value == null) return "---";
        return moment(value).format(format);
    }
}
