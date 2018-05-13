import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "boolean"})
export class BooleanPipe implements PipeTransform {
    public transform(state: boolean, trueValue?: string, falseValue?: string): string {
        if (state) {
            return trueValue || "Yes";
        } else {
            return falseValue || "No";
        }
    }
}
