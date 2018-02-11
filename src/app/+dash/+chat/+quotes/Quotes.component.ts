import {Component, ViewChild} from "@angular/core";
import {QuotesClient} from "../../../shared/modules/biliomi/clients/model/Quotes.client";
import {RestTableDataSource} from "../../../shared/modules/data-table/classes/RestTableDataSource";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {TableFilterNameMapping} from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {XLSX_FORMATTER_DATE} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {DialogsService} from "../../../shared/modules/dialogs/services/Dialogs.service";
import {UserAutoCompleteComponent} from "../../../shared/components/UserAutoComplete.component";
import {FormControl, Validators} from "@angular/forms";
import IQuote = Biliomi.IQuote;

@Component({
  selector: "quotes",
  templateUrl: require("./Quotes.template.html")
})
export class QuotesComponent {
  private _dialogs: DialogsService;
  private _quotesClient: QuotesClient;

  public dataSource: RestTableDataSource<IQuote> = new RestTableDataSource<IQuote>();

  @ViewChild("userControl")
  public userControl: UserAutoCompleteComponent;
  public messageControl: FormControl = new FormControl("", [Validators.required]);

  public tableFilterMapping: TableFilterNameMapping = {
    "username": "User.Username",
    "during game": "GameAtMoment.Name"
  };

  public exportConfig: IXlsxExportConfig = {
    fileName: "Biliomi - Quotes",
    sheetName: "Quotes",
    columns: [
      {objectPath: "$.User.DisplayName", headerName: "Username"},
      {objectPath: "$.Message", headerName: "Message"},
      {objectPath: "$.Date", headerName: "Date", formatter: XLSX_FORMATTER_DATE},
      {objectPath: "$.GameAtMoment.Name", headerName: "During Game"}
    ]
  };

  constructor(quotesClient: QuotesClient, dialogs: DialogsService) {
    this.dataSource.client = quotesClient;
    this._quotesClient = quotesClient;
    this._dialogs = dialogs;
  }

  public get isFormOk(): boolean {
    return this.messageControl.valid
      && this.userControl.valid;
  }

  public async registerNewQuote(): Promise<boolean> {
    if (this.isFormOk) {
      let confirmed = await this._dialogs.confirm(["The current game and date will be used and the quote will be stated in the chat.", "Are you sure?"]);

      if (confirmed) {
        let success = await this._quotesClient.performAddQuote(this.userControl.user.Username, this.messageControl.value);
        if (success) {
          this.dataSource.update();
          this.messageControl.reset();
          this.userControl.reset();
        }

        return success;
      }
    }

    return null;
  }

  public async deleteRecord(record: IQuote): Promise<boolean> {
    let confirmed = await this._dialogs.confirm(`Are you sure you want to delete this quote by ${record.User.DisplayName}?`);

    if (confirmed) {
      let success = await this._quotesClient.delete(record.Id);
      if (success) {
        this.dataSource.update();
      }

      return success;
    }

    return null;
  }
}
