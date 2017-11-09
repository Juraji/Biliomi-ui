import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {DefaultFormFieldStateMatcher} from "../shared/modules/ng-material/DefaultFormFieldStateMatcher";
import {Biliomi} from "../shared/modules/biliomi/Biliomi";
import IRestAuthorizationRequest = Biliomi.IRestAuthorizationRequest;
import {BiliomiApiService} from "../shared/modules/biliomi/services/BiliomiApi.service";

@Component({
  selector: "login-page",
  templateUrl: require("./Login.template.pug")
})
export class LoginComponent {
  private _api: BiliomiApiService;

  private fieldMatcher = new DefaultFormFieldStateMatcher();
  private usernameControl = new FormControl('', [Validators.required]);
  private passwordControl = new FormControl('', [Validators.required]);

  constructor(api: BiliomiApiService) {
    this._api = api;
  }

  private get formOk(): boolean {
    return this.usernameControl.valid && this.passwordControl.valid;
  }

  private submitCredentials() {
    if (this.formOk) {
      let authRequest: IRestAuthorizationRequest = {
        Username: this.usernameControl.value,
        Password: this.passwordControl.value,
      };

      console.log(authRequest);
      // Todo authorize with Biliomi
    }
  }
}
