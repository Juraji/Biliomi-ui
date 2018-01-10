import {AfterViewInit, Component, Inject, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {GamesClient} from "../../../../shared/modules/biliomi/clients/model/Games.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl, Validators} from "@angular/forms";
import * as moment from "moment";
import IGame = Biliomi.IGame;
import ICommunity = Biliomi.ICommunity;

@Component({
  selector: "edit-game-modal",
  templateUrl: require("./EditGameModal.template.pug")
})
export class EditGameModalComponent implements AfterViewInit {
  private _gameId: number;
  private _gamesClient: GamesClient;
  private _dialogRef: MatDialogRef<EditGameModalComponent>;
  private _matSnackBar: MatSnackBar;

  public editedGame: IGame;
  public gameNameControl: FormControl = new FormControl("", [Validators.required]);
  public firstPlayedOnControl: FormControl = new FormControl();
  public steamIdControl: FormControl = new FormControl();
  public communities: ICommunity[];

  constructor(@Inject(MAT_DIALOG_DATA) gameId: number,
              gamesClient: GamesClient,
              dialogRef: MatDialogRef<EditGameModalComponent>,
              matSnackBar: MatSnackBar) {
    this._gameId = gameId;
    this._gamesClient = gamesClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;

    this.firstPlayedOnControl.disable();
  }

  public async ngAfterViewInit() {
    if (this._gameId != null) {
      this.editedGame = await this._gamesClient.get(this._gameId);
    } else {
      this.editedGame = {} as IGame;
      this.editedGame.Name = "";
      this.editedGame.FirstPlayedOn = moment().toISOString(true);
      this.editedGame.Communities = [];
    }

    this.initFields();
  }

  public get isFormOk(): boolean {
    return this.gameNameControl.valid;
  }

  public initFields() {
    this.gameNameControl.setValue(this.editedGame.Name);
    this.firstPlayedOnControl.setValue(this.editedGame.FirstPlayedOn);
    this.steamIdControl.setValue(this.editedGame.SteamId);
    this.communities = this.editedGame.Communities.slice();
  }

  public async save() {
    if (this.isFormOk) {
      let game: IGame = {...this.editedGame};
      let persistedGame: IGame;

      game.Name = this.gameNameControl.value;
      game.FirstPlayedOn = this.firstPlayedOnControl.value;
      game.SteamId = this.steamIdControl.value;
      game.Communities = this.communities;

      if (this._gameId == null) {
        persistedGame = await this._gamesClient.post(game);
      } else {
        persistedGame = await this._gamesClient.put(this._gameId, game);
      }

      if (persistedGame == null) {
        this._matSnackBar.open("Could not save game " + game.Name + ", check your input.", "Ok");
      } else {
        this._dialogRef.close(true);
      }
    }
  }

  public cancelEdit() {
    this._dialogRef.close(false);
  }
}
