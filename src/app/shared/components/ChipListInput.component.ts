import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatChipInputEvent} from "@angular/material";
import {StringUtils} from "../modules/tools/StringUtils";

@Component({
  selector: "chip-list-input",
  templateUrl: require("./ChipListInput.template.html")
})
export class ChipListInputComponent {
  private _chips: string[] = [];

  @Input("placeholder")
  public inputPlaceholder: string;

  @Output("chips")
  public chipsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input("chips")
  public get chips(): string[] {
    return this._chips;
  }

  public set chips(value: string[]) {
    this._chips = value;
  }

  public addChipItem(event: MatChipInputEvent) {
    let value: string = (event.value || "").trim();
    if (StringUtils.isNotEmpty(value)) {
      this._chips.push(value);
      this.chipsChange.next(this.chips);
    }

    if (event.input) {
      event.input.value = "";
    }
  }

  public removeChip(value: string) {
    let index: number = this._chips.indexOf(value);

    if (index > -1) {
      this._chips.splice(index, 1);
      this.chipsChange.next(this.chips);
    }
  }
}
