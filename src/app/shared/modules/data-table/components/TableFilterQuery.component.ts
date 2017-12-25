import {Component, HostBinding, Input, OnInit, Optional} from "@angular/core";
import {DataTableComponent} from "../DataTable.component";
import {FormControl, Validators} from "@angular/forms";
import {StringUtils} from "../../tools/StringUtils";
import {TableFilterNameMapping} from "../classes/interfaces/TableFilterMapping.interface";
import {MatDialog} from "@angular/material";

@Component({
  selector: "table-filter-query",
  templateUrl: require("./TableFilterQuery.template.pug"),
  styleUrls: [require("./TableFilterQuery.less").toString()]
})
export class TableFilterQueryComponent<T> implements OnInit {
  private _table: DataTableComponent<T>;
  private _fieldFocus: boolean;
  private _dialog: MatDialog;

  @Input("filterMapping")
  public filterMapping: TableFilterNameMapping = null;

  @HostBinding("class.filter-field-focus")
  public get fieldFocus(): boolean {
    return this._fieldFocus || this.filterQueryControl.value.length > 0;
  }

  public set fieldFocus(fieldFocus: boolean) {
    this._fieldFocus = fieldFocus;
  }

  public filterQueryControl: FormControl = new FormControl("", [Validators.pattern(/^([a-z. ]+\s+[!]?[=~<>]\s["]?[a-z0-9.\- ]+["]?(\s(and|or)\s)?)+$/i)]);

  constructor(@Optional() table: DataTableComponent<T>, dialog: MatDialog) {
    this._table = table;
    this._dialog = dialog;
  }

  public ngOnInit() {
  }

  public async applyQuery(e: Event) {
    if (this.filterQueryControl.valid) {
      e.preventDefault();
      let query = this.filterQueryControl.value.trim();
      let ds = this._table.tableDataSource;

      if (StringUtils.isEmpty(query)) {
        ds.clientParams.delete("filter");
        ds.update();
      } else {
        if (this.filterMapping != null) {
          Object.keys(this.filterMapping).forEach((key:string) => {
            query = query.replace(new RegExp(`(\\s?)${key}(\\s)`, "gi"), `$1${this.filterMapping[key]}$2`);
          });
        }

        ds.clientParams.set("filter", query);
        let success: boolean = await ds.update();
        if (!success) {
          this.filterQueryControl.setErrors({emptyResult: true});
        }
      }
    }
  }

  public clearInput(){
    this.filterQueryControl.setValue("");
    this._table.tableDataSource.clientParams.delete("filter");
    this._table.tableDataSource.update();
  }

  // noinspection JSMethodCanBeStatic
  public showHelp() {
    window.open("https://github.com/Juraji/Biliomi/wiki/API-Queries");
  }
}