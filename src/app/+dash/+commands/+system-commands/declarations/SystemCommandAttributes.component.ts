import {Component, Input} from "@angular/core";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import ICommand = Biliomi.ICommand;

@Component({
  selector: "system-command-attributes",
  templateUrl: require("./SystemCommandAttributes.template.pug")
})
export class SystemCommandAttributesComponent {

  @Input("command")
  public command: ICommand;
}
