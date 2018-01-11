import {Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";

@Injectable()
export class FormControlRegisterService {
  private _controls: FormControl[] = [];

  public registerControl(control: FormControl) {
    this._controls.push(control);
  }

  public hasDirtyControls(): boolean {
    return this._controls
      .map((c: FormControl) => c.dirty)
      .reduce((l: boolean, r: boolean) => l || r, false);
  }

  public clear() {
    this._controls = [];
  }
}