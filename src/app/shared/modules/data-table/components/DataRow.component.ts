import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "data-row",
  templateUrl: require("./Row.template.pug"),
  host: {
    "class": "data-row",
    "role": "row"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class DataRowComponent {
}
