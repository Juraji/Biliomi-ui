import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/Auth.service";
import {LOGIN_ROUTE} from "../../Main.module";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import ITokenUserType = Biliomi.ITokenUserType;

const MODERATOR_CAN_ACTIVATE_ROUTE_DATA_KEY: string = "moderatorCanActivate";

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
  private _router: Router;
  private _auth: AuthService;

  constructor(router: Router, auth: AuthService) {
    this._router = router;
    this._auth = auth;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.isTokenViable) {
      return this.userTypeCanActivate(route);
    } else {
      this._router.navigateByUrl(LOGIN_ROUTE, {replaceUrl: true});
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  private userTypeCanActivate(route: ActivatedRouteSnapshot) {
    if (this._auth.userType === ITokenUserType.CASTER) {
      return true;
    } else {
      return route.routeConfig.data.hasOwnProperty(MODERATOR_CAN_ACTIVATE_ROUTE_DATA_KEY)
        && route.routeConfig.data[MODERATOR_CAN_ACTIVATE_ROUTE_DATA_KEY] === true;
    }
  }
}
