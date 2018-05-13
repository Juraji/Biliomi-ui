import { Component, OnInit } from "@angular/core";
import { ChannelStatusClient } from "../../../shared/modules/biliomi/clients/ChannelStatus.client";
import { GamesClient } from "../../../shared/modules/biliomi/clients/model/Games.client";
import { FormControl, Validators } from "@angular/forms";
import { SortBuilder } from "../../../shared/modules/biliomi/classes/SortBuilder";

@Component({
    selector: "channel-edit-component",
    templateUrl: require("./ChannelEdit.template.html")
})
export class ChannelEditComponent implements OnInit {
    public channelInfoClient: ChannelStatusClient;
    public gamesClient: GamesClient;

    public channelGameControl = new FormControl("", [Validators.required]);
    public channelStatusControl = new FormControl("", [Validators.required]);

    constructor(channelInfoClient: ChannelStatusClient, gamesClient: GamesClient) {
        this.channelInfoClient = channelInfoClient;
        this.gamesClient = gamesClient;
    }

    public get statusHasTemplate(): boolean {
        return this.channelInfoClient.Status !== this.channelInfoClient.StatusWithoutTemplate;
    }

    public get isFormOk(): boolean {
        return this.channelGameControl.valid && this.channelStatusControl.valid;
    }

    public ngOnInit() {
        this.refreshFields();
    }

    public async refreshFields() {
        let gamesSort: SortBuilder = new SortBuilder()
            .add("Name", false);

        await this.channelInfoClient.load(true);
        await this.gamesClient.load(true, gamesSort);
        this.channelGameControl.reset(this.channelInfoClient.CurrentGame.Name);
        this.channelStatusControl.reset(this.channelInfoClient.StatusWithoutTemplate);
    }

    public async submitChannelEdit() {
        if (this.isFormOk) {

            // Only update the game if it has actually changed
            if (this.channelGameControl.value !== this.channelInfoClient.CurrentGame.Name) {
                await this.channelInfoClient.updateGame(this.channelGameControl.value);
            }

            // Only update the status if it has actually changed
            if (this.channelStatusControl.value !== this.channelInfoClient.StatusWithoutTemplate) {
                await this.channelInfoClient.updateStatus(this.channelStatusControl.value);
            }

            // Refresh the fields either way
            this.refreshFields();
        }
    }
}
