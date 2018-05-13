import { Component, OnInit } from "@angular/core";
import { TamagotchiSettingsClient } from "../../../../shared/modules/biliomi/clients/settings/TamagotchiSettings.client";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "tamagotchi-settings",
    templateUrl: require("./TamagotchiSettings.template.html")
})
export class TamagotchiSettingsComponent implements OnInit {
    public newPriceControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
    public foodPriceControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
    public soapPriceControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
    public maxFoodControl: FormControl = new FormControl(0, [Validators.required, Validators.min(1)]);
    public maxMoodControl: FormControl = new FormControl(0, [Validators.required, Validators.min(1)]);
    public maxHygieneControl: FormControl = new FormControl(0, [Validators.required, Validators.min(1)]);
    public nameMaxLengthControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
    public botTamagotchiEnabledControl: FormControl = new FormControl(false);
    private _tamagotchiSettingsClient: TamagotchiSettingsClient;

    constructor(tamagotchiSettingsClient: TamagotchiSettingsClient) {
        this._tamagotchiSettingsClient = tamagotchiSettingsClient;
    }

    public get isFormOk(): boolean {
        return this.newPriceControl
            && this.foodPriceControl.valid
            && this.soapPriceControl.valid
            && this.maxFoodControl.valid
            && this.maxMoodControl.valid
            && this.maxHygieneControl.valid
            && this.nameMaxLengthControl.valid;
    }

    public ngOnInit() {
        this.initFields();
    }

    public async initFields() {
        await this._tamagotchiSettingsClient.load(true);
        this.newPriceControl.reset(this._tamagotchiSettingsClient.NewPrice);
        this.foodPriceControl.reset(this._tamagotchiSettingsClient.FoodPrice);
        this.soapPriceControl.reset(this._tamagotchiSettingsClient.SoapPrice);
        this.maxFoodControl.reset(this._tamagotchiSettingsClient.MaxFood);
        this.maxMoodControl.reset(this._tamagotchiSettingsClient.MaxMood);
        this.maxHygieneControl.reset(this._tamagotchiSettingsClient.MaxHygiene);
        this.nameMaxLengthControl.reset(this._tamagotchiSettingsClient.NameMaxLength);
        this.botTamagotchiEnabledControl.reset(this._tamagotchiSettingsClient.BotTamagotchiEnabled);
    }

    public async save() {
        if (this.isFormOk) {
            this._tamagotchiSettingsClient.NewPrice = this.newPriceControl.value;
            this._tamagotchiSettingsClient.FoodPrice = this.foodPriceControl.value;
            this._tamagotchiSettingsClient.SoapPrice = this.soapPriceControl.value;
            this._tamagotchiSettingsClient.MaxFood = this.maxFoodControl.value;
            this._tamagotchiSettingsClient.MaxMood = this.maxMoodControl.value;
            this._tamagotchiSettingsClient.MaxHygiene = this.maxHygieneControl.value;
            this._tamagotchiSettingsClient.NameMaxLength = this.nameMaxLengthControl.value;
            this._tamagotchiSettingsClient.BotTamagotchiEnabled = this.botTamagotchiEnabledControl.value;

            let result = await this._tamagotchiSettingsClient.save();
            this.initFields();

            return result != null;
        }

        return null;
    }
}
