import {Component, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {BiliomiApiService} from "../shared/modules/biliomi/services/BiliomiApi.service";
import {Biliomi} from "../shared/modules/biliomi/classes/interfaces/Biliomi";
import {AuthService} from "../shared/services/Auth.service";
import {Router} from "@angular/router";
import {DASH_ROUTE} from "../Main.module";
import IAuthRequest = Biliomi.IRestAuthorizationRequest;
import IAuthResponse = Biliomi.IRestAuthorizationResponse;

@Component({
  selector: "login-page",
  templateUrl: require("./Login.template.pug"),
  styleUrls: [require("./Login.less").toString()]
})
export class LoginComponent implements OnInit {
  private _api: BiliomiApiService;
  private _auth: AuthService;
  private _router: Router;

  private usernameControl = new FormControl('', [Validators.required]);
  private passwordControl = new FormControl('', [Validators.required]);

  constructor(api: BiliomiApiService, auth: AuthService, router: Router) {
    this._api = api;
    this._auth = auth;
    this._router = router;
  }

  public ngOnInit() {
    if (this._auth.isTokenViable) {
      this._router.navigateByUrl(DASH_ROUTE);
    }
  }

  public get isFormOk(): boolean {
    return this.usernameControl.valid && this.passwordControl.valid;
  }

  public async submitCredentials() {
    if (this.isFormOk) {
      let authRequest: IAuthRequest = {
        Username: this.usernameControl.value,
        Password: this.passwordControl.value,
      };

      let response: IAuthResponse = await this._api.postUnauthorized<IAuthRequest, IAuthResponse>("/auth/login", authRequest);
      if (response.AuthorizationToken == null) {
        if (response.Message.indexOf("username") > 0) {
          this.usernameControl.setErrors({invalidEntry: true});
        } else {
          this.passwordControl.setErrors({invalidEntry: true});
        }
      } else {
        this._auth.authorizationToken = response.AuthorizationToken;
        this._auth.refreshToken = response.RefreshToken;
        location.reload(true);
      }
    }
  }
}
