import {Component} from "@angular/core";
import {GamesClient} from "../../../shared/modules/biliomi/clients/model/Games.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {MatDialog} from "@angular/material";
import {EditGameModalComponent} from "./declarations/EditGameModal.component";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {ConfirmDialogComponent} from "../../../shared/components/ConfirmDialog.component";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import IGame = Biliomi.IGame;
import ICommunity = Biliomi.ICommunity;

@Component({
  selector: "game-register",
  templateUrl: require("./GameRegister.template.pug")
})
export class GameRegisterComponent {
  private _dialog: MatDialog;
  private _gamesClient: GamesClient;
  private gamesDataSource: RestTableDataSource<IGame> = new RestTableDataSource<IGame>();

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

  constructor(gamesClient: GamesClient, dialog: MatDialog) {
    this._dialog = dialog;
    this._gamesClient = gamesClient;
    this.gamesDataSource.client = gamesClient;
  }

  public setAsCurrentGame(game: IGame) {
    this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to set "${game.Name}" as the current game?`
    }).afterClosed()
      .filter((choice: boolean) => choice)
      .subscribe(() => this._gamesClient.setAsCurrentGame(game));
  }

  public editGame(game: IGame) {
    this._dialog.open(EditGameModalComponent, {
      width: "600px",
      data: (game ? game.Id : null)
    }).afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.gamesDataSource.update());
  }
}
