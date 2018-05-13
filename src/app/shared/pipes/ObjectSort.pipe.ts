import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "objectSort"})
export class ObjectSortPipe implements PipeTransform {
    public transform(value: any[], property: string): any[] {
        if (value == null || property == null) {
            return value;
        }

        return value.sort((a: any, b: any) => {
            let aValue = a[property];
            let bValue = b[property];

            if (typeof aValue !== typeof bValue) {
                throw new Error("Trying to sort incompatible values");
            }

            switch (typeof aValue) {
                case "string":
                    return aValue.localeCompare(bValue);
                case "number":
                    return a - b;
                default:
                    return 0;
            }
        });
    }
}
