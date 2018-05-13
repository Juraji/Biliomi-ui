import { Injectable } from "@angular/core";
import { SettingsRestClient } from "../../classes/abstract/SettingsRestClient";
import { Biliomi } from "../../classes/interfaces/Biliomi";
import { BiliomiApiService } from "../../services/BiliomiApi.service";
import ITamagotchiSettings = Biliomi.ITamagotchiSettings;

@Injectable()
export class TamagotchiSettingsClient extends SettingsRestClient<ITamagotchiSettings> implements ITamagotchiSettings {
    public NewPrice: number;
    public FoodPrice: number;
    public SoapPrice: number;
    public MaxFood: number;
    public MaxMood: number;
    public MaxHygiene: number;
    public NameMaxLength: number;
    public BotTamagotchiEnabled: boolean;
    public Type: string;

    constructor(api: BiliomiApiService) {
        super(api, "/games/settings/tamagotchi");
    }
}
