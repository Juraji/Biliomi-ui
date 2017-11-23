import {Component, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {BiliomiApiService} from "../shared/modules/biliomi/services/BiliomiApi.service";
import {Biliomi} from "../shared/modules/biliomi/classes/interfaces/Biliomi";
import {AuthService} from "../shared/services/Auth.service";
import {Router} from "@angular/router";
import {DASH_ROUTE} from "../Main.module";
import {DefaultFormFieldStateMatcher} from "../shared/modules/ng-material/classes/DefaultFormFieldStateMatcher.class";
import IRestAuthorizationRequest = Biliomi.IRestAuthorizationRequest;
import IRestAuthorizationResponse = Biliomi.IRestAuthorizationResponse;

@Component({
  selector: "login-page",
  templateUrl: require("./Login.template.pug"),
  styleUrls: [require("./Login.less").toString()]
})
export class LoginComponent implements OnInit {
  private _api: BiliomiApiService;
  private _auth: AuthService;
  private _router: Router;

  private fieldMatcher = new DefaultFormFieldStateMatcher();
  private usernameControl = new FormControl('', [Validators.required]);
  private passwordControl = new FormControl('', [Validators.required]);

  constructor(api: BiliomiApiService, auth: AuthService, router: Router) {
    this._api = api;
    this._auth = auth;
    this._router = router;
  }

  public ngOnInit() {
    if (this._auth.isTokenValid) {
      this._router.navigateByUrl(DASH_ROUTE);
    }
  }

  private get isFormOk(): boolean {
    return this.usernameControl.valid && this.passwordControl.valid;
  }

  private async submitCredentials() {
    if (this.isFormOk) {
      let authRequest: IRestAuthorizationRequest = {
        Username: this.usernameControl.value,
        Password: this.passwordControl.value,
      };

      let response: IRestAuthorizationResponse = await this._api
        .post<IRestAuthorizationRequest, IRestAuthorizationResponse>("/auth/login", authRequest);
      if (response.Token == null) {
        if (response.Message.indexOf("username") > 0) {
          this.usernameControl.setErrors({invalidEntry: true});
        } else {
          this.passwordControl.setErrors({invalidEntry: true});
        }
      } else {
        this._auth.apiToken = response.Token;
        location.reload(true);
      }
    }
  }
}
