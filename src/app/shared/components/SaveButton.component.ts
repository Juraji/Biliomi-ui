import {Component, EventEmitter, Input, ViewChild} from "@angular/core";
import {MatButton} from "@angular/material";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: "save-button",
  templateUrl: require("./SaveButton.template.pug"),
  styleUrls: [require("./SaveButton.less").toString()]
})
export class SaveButtonComponent {
  private _button: MatButton;
  private _emitterSub: Subscription;

  @ViewChild(MatButton)
  public set button(button: MatButton) {
    this._button = button;
  }

  @Input("tooltip")
  public tooltip: string = "Save";

  @Input("disabled")
  public disabled: boolean = false;

  @Input("stateEmitter")
  public set stateEmitter(emitter: EventEmitter<boolean>) {
    if (this._emitterSub != null) {
      this._emitterSub.unsubscribe();
    }

    if (emitter != null) {
      this._emitterSub = emitter
        .filter(() => this._button != null)
        .subscribe((state: boolean) => this.state = state);
    }
  }

  // Button will change color when input changes
  @Input("state")
  public set state(state: boolean) {
    if (this._button != null) {
      this._button.color = (state ? "accent" : "warn");
      let t = setTimeout(() => {
        this._button.color = "primary";
        clearTimeout(t);
      }, 2e3);
    }
  }
}
