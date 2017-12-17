import {Component, Input} from "@angular/core";
import {MatChipInputEvent} from "@angular/material";

@Component({
  selector: "chip-list-input",
  templateUrl: require("./ChipListInput.template.pug")
})
export class ChipListInputComponent {
  private _inputItems: any[] = [];

  @Input("placeholder")
  public inputPlaceholder: string;

  public set inputItems(value: any[]) {
    this._inputItems = value;
  }

  public get inputItems(): any[] {
    return this._inputItems;
  }


  public addChipItem(event: MatChipInputEvent) {
    let value: string = (event.value || "").trim();
    if (value) {
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
