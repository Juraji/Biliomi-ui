import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ChipListInputComponent } from "./ChipListInput.component";
import { CommunitiesClient } from "../modules/biliomi/clients/model/Communities.client";
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatChipInputEvent,
    MatChipList,
    MatSnackBar
} from "@angular/material";
import { Biliomi } from "../modules/biliomi/classes/interfaces/Biliomi";
import { StringUtils } from "../modules/tools/StringUtils";
import ICommunity = Biliomi.ICommunity;

@Component({
    selector: "community-chip-list",
    templateUrl: require("./CommunityChipList.template.html")
})
export class CommunityChipListComponent extends ChipListInputComponent implements AfterViewInit {
    @ViewChild("chipList", {read: MatChipList})
    public chipList: MatChipList;
    @ViewChild("autoComplete", {read: MatAutocomplete})
    public autoComplete: MatAutocomplete;
    @Output("communitiesChange")
    public communitiesChange: EventEmitter<ICommunity[]> = new EventEmitter<ICommunity[]>();
    private _matSnackBar: MatSnackBar;
    private communitiesClient: CommunitiesClient;

    constructor(communitiesClient: CommunitiesClient, matSnackBar: MatSnackBar) {
        super();
        this.communitiesClient = communitiesClient;
        this._matSnackBar = matSnackBar;
    }

    @Input("communities")
    public get communities(): ICommunity[] {
        let communities: ICommunity[] = [];

        for (let communityName of this.chips) {
            let match: ICommunity = this.communitiesClient.getCache()
                .filter((c: ICommunity) => c.Name === communityName)
                .pop();
            communities.push(match);
        }

        return communities;
    }

    public set communities(communites: ICommunity[]) {
        if (communites != null) {
            this.chips = communites.map((c: ICommunity) => c.Name);
        }
    }

    public async addChipItem(event: MatChipInputEvent): Promise<void> {
        if (StringUtils.isNotEmpty(event.value) && this.chips.indexOf(event.value) === -1) {
            let community: ICommunity;

            let matches: ICommunity[] = this.communitiesClient.searchCacheByPredicate((c: ICommunity) =>
                StringUtils.equalsIgnoreCase(c.Name, event.value));
            if (matches.length > 0) {
                community = matches.shift();
            } else {
                community = await this.communitiesClient.searchCommunityByName(event.value);
            }

            if (community != null) {
                if (this.chips.length >= 3) {
                    this.chips.shift();
                }
                event.value = community.Name;
                super.addChipItem(event);
                this.communitiesChange.next(this.communities);
            } else {
                this._matSnackBar.open("Could not find a community by name \"" + event.value + "\"!", "Ok");
                event.input.value = "";
            }
        }
    }

    public removeChip(value: string): void {
        super.removeChip(value);
        this.communitiesChange.next(this.communities);
    }

    public ngAfterViewInit() {
        this.communitiesClient.load(true);
        this.autoComplete.optionSelected.subscribe((e: MatAutocompleteSelectedEvent) => {
            this.addChipItem({
                input: this.chipList as any, // Slight hack to have addChipItem accept the input
                value: e.option.value
            });
        });
    }
}
