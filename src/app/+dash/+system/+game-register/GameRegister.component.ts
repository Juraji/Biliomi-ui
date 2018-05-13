import { Component } from "@angular/core";
import { GamesClient } from "../../../shared/modules/biliomi/clients/model/Games.client";
import { RestTableDataSource } from "../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { EditGameModalComponent } from "./declarations/EditGameModal.component";
import { IXlsxExportConfig } from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import { XLSX_FORMATTER_DATE } from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import { TableFilterNameMapping } from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import { DialogsService } from "../../../shared/modules/dialogs/services/Dialogs.service";
import { filter } from "rxjs/operators";
import IGame = Biliomi.IGame;
import ICommunity = Biliomi.ICommunity;

@Component({
    selector: "game-register",
    templateUrl: require("./GameRegister.template.html")
})
export class GameRegisterComponent {
    public exportConfig: IXlsxExportConfig = {
        fileName: "Biliomi - Games",
        sheetName: "Games",
        columns: [
            {objectPath: "$.Name", headerName: "Name"},
            {objectPath: "$.FirstPlayedOn", headerName: "First Played On", formatter: XLSX_FORMATTER_DATE},
            {objectPath: "$.SteamId", headerName: "Steam Id"},
            {
                objectPath: "$.Communities",
                headerName: "Communities",
                formatter: (c: ICommunity[]) => c.map((c: ICommunity) => c.Name).join(", ")
            }
        ]
    };
    public tableFilterMapping: TableFilterNameMapping = {
        "title": "Name",
        "first played": "FirstPlayedOn",
        "steam id": "SteamId"
    };
    private _dialog: DialogsService;
    private _gamesClient: GamesClient;
    private gamesDataSource: RestTableDataSource<IGame> = new RestTableDataSource<IGame>();

    constructor(gamesClient: GamesClient, dialog: DialogsService) {
        this._dialog = dialog;
        this._gamesClient = gamesClient;
        this.gamesDataSource.client = gamesClient;
    }

    public async setAsCurrentGame(game: IGame) {
        let confirmed = await this._dialog.confirm(`Are you sure you want to set "${game.Name}" as the current game?`);
        if (confirmed) {
            this._gamesClient.setAsCurrentGame(game);
        }
    }

    public editGame(game: IGame) {
        let sub = this._dialog.open(EditGameModalComponent, {
            width: "600px",
            data: (game ? game.Id : null)
        }).afterClosed()
            .pipe(filter((success: boolean) => success))
            .subscribe(() => {
                this.gamesDataSource.update();
                sub.unsubscribe();
            });
    }
}
