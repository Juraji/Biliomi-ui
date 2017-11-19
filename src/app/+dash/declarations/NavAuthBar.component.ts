import {Component} from "@angular/core";
import {AuthService} from "../../shared/services/Auth.service";

@Component({
  selector: "nav-auth-bar-component",
  templateUrl: require("./NavAuthBar.template.pug")
})
export class NavAuthBarComponent {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
