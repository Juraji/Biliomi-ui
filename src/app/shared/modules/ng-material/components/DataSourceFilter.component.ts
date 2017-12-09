import {Component, Input, ViewChild} from "@angular/core";
import {MatInput, MatTableDataSource} from "@angular/material";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "mat-data-source-filter-field",
  templateUrl: require("./DataSourceFilter.template.pug")
})
export class DataSourceFilterComponent {
  private _activatedRoute: ActivatedRoute;

  @Input("dataSource")
  private dataSource: MatTableDataSource<any>;

  @Input("placeholder")
  private fieldPlaceholder: string;

  @ViewChild("filterInput", {read: MatInput})
  private filterInput: MatInput;

  constructor(activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute;
  }

  public onFieldKeyUp(event: Event) {
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }

  public set value(value:string) {
    this.filterInput.value = value;
    this.dataSource.filter = value;
  }
}
