import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Routes} from "@angular/router";
import {UsersClient} from "../../../../shared/modules/biliomi/clients/model/Users.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {Subscription} from "rxjs/Subscription";
import {CrumbsService} from "../../../../shared/modules/breadcrumbs/services/Crumbs.service";
import {AuthService} from "../../../../shared/services/Auth.service";
import {StringUtils} from "../../../../shared/modules/tools/StringUtils";
import IUser = Biliomi.IUser;

@Component({
  selector: "edit-user",
  templateUrl: require("./EditUser.template.html")
})
export class EditUserComponent implements OnInit, OnDestroy {
  private _activatedRoute: ActivatedRoute;
  private _breadCrumbs: CrumbsService;
  private _usersClient: UsersClient;
  private _authService: AuthService;
  private _paramSub: Subscription;
  private _childRoutes: Routes;
  private _user: IUser;

  public get user(): IUser {
    return this._user;
  }

  public get childRoutes(): Routes {
    return this._childRoutes;
  }

  public get isCurrentUser(): boolean {
    return StringUtils.equalsIgnoreCase(this._authService.username, this.user.Username);
  }

  constructor(activatedRoute: ActivatedRoute,
              usersClient: UsersClient,
              breadCrumbs: CrumbsService,
              authService: AuthService) {
    this._activatedRoute = activatedRoute;
    this._usersClient = usersClient;
    this._breadCrumbs = breadCrumbs;
    this._authService = authService;

    this._childRoutes = activatedRoute.routeConfig.children;
  }

  public ngOnInit() {
    this._paramSub = this._activatedRoute.paramMap
      .filter((map: ParamMap) => map.has("username"))
      .map((map: ParamMap) => map.get("username"))
      .subscribe(async (username: string) => {
        this._user = await this._usersClient.getUserByUsername(username.toLowerCase());
        this._breadCrumbs.updateVariables({username: this._user.DisplayName});
      });
  }

  public ngOnDestroy(): void {
    if (this._paramSub) {
      this._paramSub.unsubscribe();
    }
  }
}
