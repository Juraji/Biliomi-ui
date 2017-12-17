import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "numberArray"})
export class NumberArrayPipe implements PipeTransform{
  public transform(max: number, min: number = 0): number[] {
    let c: number = min;
    let numbers: number[] = [];

    while (c <= max) {
      numbers.push(c);
      c++;
    }

    return numbers;
  }
}
