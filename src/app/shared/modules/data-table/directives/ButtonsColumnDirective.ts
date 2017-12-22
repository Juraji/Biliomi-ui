import {Directive, HostBinding, Input} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

const BUTTON_WIDTH: number = 40;

@Directive({
  selector: "[buttonsColumn]",
  host: {
    '[class]': "buttons-column"
  }
})
export class ButtonsColumnDirective {
  private _sanitizer: DomSanitizer;

  @Input("buttonsColumn")
  public buttonCount: number = 1;

  @HostBinding("style.width.px")
  public get targetWidth(): number {
    return this.buttonCount * BUTTON_WIDTH;
  }

  constructor(sanitizer: DomSanitizer) {
    this._sanitizer = sanitizer;
  }
}
