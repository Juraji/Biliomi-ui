import {Directive, HostBinding, HostListener, Input} from "@angular/core";
import {Callable} from "../modules/tools/FunctionalInterface";
import {FormControlRegisterService} from "../modules/dirty-form-navigation-guard/services/FormControlRegister.service";

import "./ActionButton.less";

type ActionCallback = Callable<boolean | Promise<boolean>>;

@Directive({
  selector: "button[actionButton]",
  host: {
    "class": "action-button"
  }
})
export class ActionButtonDirective {
  private _action: ActionCallback;
  private _formControlRegisterService: FormControlRegisterService;
  private _state: boolean;

  @Input("actionButton")
  public get actionButton(): ActionCallback {
    return this._action;
  }

  public set actionButton(fn: ActionCallback) {
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
    let result = false;

    try {
      let intermediate = this._action.apply(null);
      result = (intermediate instanceof Promise ? await intermediate : intermediate);

      if (result === true) {
        // Reset registered form controls when state is ok
        this._formControlRegisterService.resetControls();
      }
    } catch (e) {
      console.log(e);
    }

    if (result != null) {
      this._state = result;
      let t = setTimeout(() => {
        this._state = null;
        clearTimeout(t);
      }, 2e3);
    }
  }
}
