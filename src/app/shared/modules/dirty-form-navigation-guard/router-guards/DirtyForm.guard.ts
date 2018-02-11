import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {DialogsService} from "../../dialogs/services/Dialogs.service";
import {FormControlRegisterService} from "../services/FormControlRegister.service";

@Injectable()
export class DirtyFormGuard implements CanActivate, CanActivateChild {
  private _formControlRegisterService: FormControlRegisterService;
  private _dialogsService: DialogsService;

  constructor(formControlRegisterService: FormControlRegisterService, confirmDialogService: DialogsService) {
    this._formControlRegisterService = formControlRegisterService;
    this._dialogsService = confirmDialogService;
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this._formControlRegisterService.hasDirtyControls()) {
      let navigationConfirmed = await this._dialogsService.confirm("You've made changes on a form, are you sure you want to leave?");

      if (navigationConfirmed) {
        this._formControlRegisterService.clear();
      }

      return navigationConfirmed;
    } else {
      return true;
    }
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
