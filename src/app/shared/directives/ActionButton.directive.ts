import {Directive, HostBinding, HostListener, Input, Self} from "@angular/core";
import {Supplier} from "../modules/tools/FunctionalInterface";
import {FormControlRegisterService} from "../modules/dirty-form-navigation-guard/services/FormControlRegister.service";
import {MatButton} from "@angular/material";

import "./ActionButton.less";

@Directive({
  selector: "button[actionButton]",
  host: {
    "class": "action-button"
  }
})
export class ActionButtonDirective {
  private _action: Supplier<boolean | Promise<boolean>>;
  private _formControlRegisterService: FormControlRegisterService;
  private _state: boolean;

  @Input("actionButton")
  public set action(fn: Supplier<boolean | Promise<boolean>>) {
    this._action = fn;
  }

  @HostBinding("class.state-ok")
  public get isInOkState(): boolean {
    return this._state === true;
  }

  @HostBinding("class.state-failed")
  public get isInFailedState(): boolean {
    return this._state === false;
  }

  constructor(formControlRegisterService: FormControlRegisterService) {
    this._formControlRegisterService = formControlRegisterService;
  }

  @HostListener("click")
  public async performAction() {
    let intermediate = this._action.apply(null);
    let result = (intermediate instanceof Promise ? await intermediate : intermediate);

    if (result === true) {
      // Reset registered form controls when state is ok
      this._formControlRegisterService.resetControls();
    }

    if (result != null) {
      this._state = result;
      let t = setTimeout(() => {
        this._state = null;
        clearTimeout(t);
      }, 1e30);
    }
  }
}
