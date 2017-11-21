import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "svgTransform"})
export class SvgTransformPipe implements PipeTransform {
  public transform(value: any, transform: string): any {
    return transform + "(" + value + ")";
  }
}
