import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {ChipListInputComponent} from "../modules/ng-material/components/ChipListInput.component";
import {CommunitiesClient} from "../modules/biliomi/clients/model/Communities.client";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatChipList, MatSnackBar} from "@angular/material";
import {Biliomi} from "../modules/biliomi/classes/interfaces/Biliomi";
import {StringUtils} from "../modules/tools/StringUtils";
import ICommunity = Biliomi.ICommunity;

@Component({
  selector: "community-chip-list",
  templateUrl: require("./CommunityChipList.template.pug")
})
export class CommunityChipListComponent extends ChipListInputComponent implements AfterViewInit {
  private _matSnackBar: MatSnackBar;
  private communitiesClient: CommunitiesClient;

  @ViewChild("chipList", {read: MatChipList})
  public chipList: MatChipList;

  @ViewChild("autoComplete", {read: MatAutocomplete})
  public autoComplete: MatAutocomplete;

  public set selectedCommunities(communites: ICommunity[]) {
    if (communites != null) {
      this.inputItems = communites.map((c: ICommunity) => c.Name);
    }
  }

  public get selectedCommunities(): ICommunity[] {
    let communities: ICommunity[] = [];

    for (let communityName of this.inputItems) {
      let match: ICommunity = this.communitiesClient.getCache()
        .filter((c: ICommunity) => c.Name === communityName)
        .pop();
      communities.push(match);
    }

    return communities;
  }

  constructor(communitiesClient: CommunitiesClient, matSnackBar: MatSnackBar) {
    super();
    this.communitiesClient = communitiesClient;
    this._matSnackBar = matSnackBar;
  }

  public async addChipItem(event: MatChipInputEvent): Promise<void> {
    if (StringUtils.isNotEmpty(event.value) && this.inputItems.indexOf(event.value) === -1) {
      let community: ICommunity;

      let matches: ICommunity[] = this.communitiesClient.searchCacheByPredicate((c: ICommunity) => StringUtils.equalsIgnoreCase(c.Name, event.value));
      if (matches.length > 0) {
        community = matches.shift();
      } else {
        community = await this.communitiesClient.searchCommunityByName(event.value);
      }

      if (community != null) {
        if (this.inputItems.length >= 3) {
          this.inputItems.shift();
        }
        event.value = community.Name;
        super.addChipItem(event);
      } else {
        this._matSnackBar.open("Could not find a community by name \"" + event.value + "\"!", "Ok");
        event.input.value = "";
      }
    }
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
