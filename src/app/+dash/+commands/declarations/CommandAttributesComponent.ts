import {Component, Input} from "@angular/core";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import ICommand = Biliomi.ICommand;
import ICustomCommand = Biliomi.ICustomCommand;

@Component({
  selector: "command-attributes",
  templateUrl: require("./CommandAttributes.pug")
})
export class CommandAttributesComponent {

  @Input("command")
  public command: ICommand | ICustomCommand;
}
