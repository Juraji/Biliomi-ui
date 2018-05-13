import { Pipe, PipeTransform } from "@angular/core";
import { PageEvent } from "@angular/material";

@Pipe({name: "arrayPageSlice"})
export class ArrayPageSlicePipe implements PipeTransform {
    public transform(values: any[], pageEvent: PageEvent): any[] {
        if (values == null || pageEvent == null) {
            return values;
        }

        let offset: number = pageEvent.pageSize * pageEvent.pageIndex;
        return values.slice(offset, pageEvent.pageSize + offset);
    }
}
