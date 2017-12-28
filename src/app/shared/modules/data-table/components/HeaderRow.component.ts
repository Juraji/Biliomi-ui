import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "header-row",
  templateUrl: require("./Row.template.pug"),
  host: {
    "class": "header-row",
    "role": "row"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class HeaderRowComponent {
}
