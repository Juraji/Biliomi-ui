import {Component, HostBinding, Optional} from "@angular/core";
import {DataTableComponent} from "../DataTable.component";
import {FormControl, Validators} from "@angular/forms";
import {StringUtils} from "../../tools/StringUtils";
import {MatDialog} from "@angular/material";
import {RestTableDataSource} from "../classes/RestTableDataSource";
import {TableFilterNameMapping} from "../classes/interfaces/DataTable";

@Component({
  selector: "table-filter-query",
  templateUrl: require("./TableFilterQuery.template.pug"),
  styleUrls: [require("./TableFilterQuery.less").toString()]
})
export class TableFilterQueryComponent<T> {
  private _parentTable: DataTableComponent<T>;
  private _fieldFocus: boolean;
  private _dialog: MatDialog;

  public filterQueryControl: FormControl = new FormControl("", [Validators.pattern(/^([a-z. ]+\s+[!]?[=~<>]\s["]?[a-z0-9.\-_: ]+["]?(\s(and|or)\s)?)+$/i)]);

  @HostBinding("class.filter-field-focus")
  public get fieldFocus(): boolean {
    return this._fieldFocus || this.fieldValue.length > 0;
  }

  private get fieldValue(): string {
    return this.filterQueryControl.value.trim();
  }

  private get filterMapping(): TableFilterNameMapping {
    if (this._parentTable) {
      return this._parentTable.filterMapping;
    } else {
      return null;
    }
  }

  private get dataSource(): RestTableDataSource<T> {
    if (this._parentTable) {
      return this._parentTable.dataSource;
    } else {
      return null;
    }
  }

  constructor(@Optional() table: DataTableComponent<T>, dialog: MatDialog) {
    this._parentTable = table;
    this._dialog = dialog;
  }

  public async applyQuery(e: Event) {
    if (this.filterQueryControl.valid) {
      if (e) {
        e.preventDefault();
      }

      let query = this.fieldValue;
      let ds = this.dataSource;

      if (ds != null) {
        if (StringUtils.isEmpty(query)) {
          ds.clientParams.delete("filter");
          ds.update();
        } else {
          if (this.filterMapping != null) {
            Object.keys(this.filterMapping).forEach((key: string) => {
              query = query.replace(new RegExp(`(\\s?)${key}(\\s)`, "gi"), `$1${this.filterMapping[key]}$2`);
            });
          }

          ds.clientParams.delete("offset");
          ds.clientParams.set("filter", query);
          let success: boolean = await ds.update();
          if (!success) {
            this.filterQueryControl.setErrors({emptyResult: true});
          }
        }
      }
    }
  }

  public fieldFocusChange(isFocused: boolean) {
    this._fieldFocus = isFocused;
    this.applyQuery(null);
  }

  public clearInput() {
    this.filterQueryControl.setValue("");

    let ds = this.dataSource;
    if (ds != null) {
      ds.clientParams.delete("filter");
      ds.update();
    }
  }

  // noinspection JSMethodCanBeStatic
  public showHelp() {
    window.open("https://github.com/Juraji/Biliomi/wiki/API-Queries");
  }
}
