import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "trim"})
export class TrimPipe implements PipeTransform {
    public transform(value: string, maxLength?: number): string {
        if (value == null || value.length < maxLength) {
            return value;
        }

        return value.substr(0, maxLength - 1) + "…";
    }
}
