import {Component, Input} from "@angular/core";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import ICustomCommand = Biliomi.ICustomCommand;

@Component({
  selector: "custom-command-attributes",
  templateUrl: require("./CustomCommandAttributes.template.pug")
})
export class CustomCommandAttributesComponent {

  @Input("command")
  public command: ICustomCommand;
}
