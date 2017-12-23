import {Component, HostBinding, Input, OnInit, Optional} from "@angular/core";
import {DataTableComponent} from "../DataTable.component";
import {FormControl} from "@angular/forms";
import {RestQueryParser} from "../classes/RestQueryParser";
import {Biliomi} from "../../biliomi/classes/interfaces/Biliomi";
import {StringUtils} from "../../tools/StringUtils";
import {TableFilterNameMapping} from "../classes/interfaces/TableFilterMapping.interface";
import IRestFilterDirective = Biliomi.IRestFilterDirective;
import {MatDialog} from "@angular/material";
import {TableFilterQueryHelpModalComponent} from "./TableFilterQueryHelpModal.component";

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

  public filterQueryControl: FormControl = new FormControl("");

  constructor(@Optional() table: DataTableComponent<T>, dialog: MatDialog) {
    this._table = table;
    this._dialog = dialog;
  }

  public ngOnInit() {
  }

  public applyQuery(e: Event) {
    e.preventDefault();
    let query = this.filterQueryControl.value.trim();
    let ds = this._table.tableDataSource;

    if (StringUtils.isEmpty(query)) {
      ds.filterBuilder.clear();
      ds.update();
    } else {
      if (this.filterMapping != null) {
        Object.keys(this.filterMapping).forEach((key:string) => {
          query = query.replace(new RegExp(`(\\s?)${key}(\\s)`, "gi"), `$1${this.filterMapping[key]}$2`);
        });
      }

      let parser = new RestQueryParser(query);
      if (parser.isValid) {
        ds.filterBuilder.clear();
        parser.restFilters.forEach((d: IRestFilterDirective) => ds.filterBuilder.addDirective(d));
        ds.update();
      } else {
        this.filterQueryControl.setErrors({invalid: true});
      }
    }
  }

  public clearInput(){
    this.filterQueryControl.setValue("");
    this._table.tableDataSource.filterBuilder.clear();
    this._table.tableDataSource.update();
  }

  public showHelp() {
    this._dialog.open(TableFilterQueryHelpModalComponent);
  }
}
