import {Component, Input} from "@angular/core";
import {MatChipInputEvent} from "@angular/material";
import {StringUtils} from "../../tools/StringUtils";

@Component({
  selector: "chip-list-input",
  templateUrl: require("./ChipListInput.template.pug")
})
export class ChipListInputComponent {
  private _inputItems: string[] = [];

  @Input("placeholder")
  public inputPlaceholder: string;

  public set inputItems(value: string[]) {
    this._inputItems = value;
  }

  public get inputItems(): string[] {
    return this._inputItems;
  }

  public addChipItem(event: MatChipInputEvent) {
    let value: string = (event.value || "").trim();
    if (StringUtils.isNotEmpty(value)) {
      this._inputItems.push(value);
    }

    if (event.input) {
      event.input.value = "";
    }
  }

  public removeChip(value: string) {
    let index: number = this._inputItems.indexOf(value);

    if (index > -1) {
      this._inputItems.splice(index, 1);
    }
  }
}
