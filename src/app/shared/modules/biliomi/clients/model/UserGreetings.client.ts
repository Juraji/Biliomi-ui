import { Injectable } from "@angular/core";
import { ModelRestClient } from "../../classes/abstract/ModelRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import IUserGreeting = Biliomi.IUserGreeting;

@Injectable()
export class UserGreetingsClient extends ModelRestClient<IUserGreeting> {
    constructor(api: BiliomiApiService) {
        super(api, "/chat/usergreetings");
    }
}
