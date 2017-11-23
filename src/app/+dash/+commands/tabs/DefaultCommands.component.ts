import {Component} from "@angular/core";

@Component({
  // Since "default" is a pug keyword I chose to name the selector differently
  selector: "system-commands-component",
  templateUrl: require("./DefaultCommands.template.pug")
})
export class DefaultCommandsComponent {

}
