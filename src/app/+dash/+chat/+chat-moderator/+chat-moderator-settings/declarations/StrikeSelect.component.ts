import {Component, Input, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IModerationAction = Biliomi.IModerationAction;

@Component({
  selector: "strike-selector",
  templateUrl: require("./StrikeSelect.template.pug")
})
export class StrikeSelectComponent {
  private selectedStrikeControl: FormControl = new FormControl(IModerationAction.WARN, [Validators.required]);

  @Input("placeholder")
  private placeholderName: string;

  public get selectedStrike(): IModerationAction {
    return this.selectedStrikeControl.value;
  }

  public set selectedStrike(strike: IModerationAction) {
    this.selectedStrikeControl.setValue(strike);
  }

  public get valid(): boolean {
    return this.selectedStrikeControl.valid;
  }
}
