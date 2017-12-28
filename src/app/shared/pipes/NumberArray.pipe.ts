import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "numberArray"})
export class NumberArrayPipe implements PipeTransform {
  public transform(count: number, startAt: number = 0): number[] {
    let c: number = startAt;
    let numbers: number[] = [];

    do {
      numbers.push(c);
    } while (++c <= count);

    return numbers;
  }
}
