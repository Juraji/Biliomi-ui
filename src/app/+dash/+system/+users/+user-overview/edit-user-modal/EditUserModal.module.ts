import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../../shared/Shared.module";
import {EditUserModalComponent} from "./EditUserModal.component";
import {UserInformationComponent} from "./declarations/UserInformation.component";
import {UserHostRecordsComponent} from "./declarations/UserHostRecords.component";
import {UserAchievementsComponent} from "./declarations/UserAchievements.component";
import {UserAdventureRecordsComponent} from "./declarations/UserAdventureRecords.component";

@NgModule({
  imports: [SharedModule],
  declarations: [
    EditUserModalComponent,
    UserInformationComponent,
    UserHostRecordsComponent,
    UserAchievementsComponent,
    UserAdventureRecordsComponent
  ],
  entryComponents: [EditUserModalComponent]
})
export class EditUserModalModule {
}
