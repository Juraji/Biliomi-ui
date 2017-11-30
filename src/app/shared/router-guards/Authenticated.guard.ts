import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/Auth.service";
import {LOGIN_ROUTE} from "../../Main.module";

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
  private _router: Router;
  private _auth: AuthService;

  constructor(router: Router, auth: AuthService) {
    this._router = router;
    this._auth = auth;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.isTokenValid) {
      return true;
    } else {
      this._router.navigateByUrl(LOGIN_ROUTE);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
