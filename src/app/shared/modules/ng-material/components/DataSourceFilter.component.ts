import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {MatInput, MatTableDataSource} from "@angular/material";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: "mat-data-source-filter-field",
  templateUrl: require("./DataSourceFilter.template.pug")
})
export class DataSourceFilterComponent implements AfterViewInit {
  private _activatedRoute: ActivatedRoute;

  @Input("dataSource")
  private dataSource: MatTableDataSource<any>;

  @Input("placeholder")
  private fieldPlaceholder: string;

  @Input("queryParam")
  private queryParam: string = "filter";

  @ViewChild("filterInput", {read: MatInput})
  private filterInput: MatInput;

  constructor(activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute;
  }

  public ngAfterViewInit() {
    let sub: Subscription = this._activatedRoute.queryParams.subscribe(
      (p: Params) => {
        let value: string = p[this.queryParam] || "";
        this.filterInput.value = value;
        this.dataSource.filter = value.trim().toLowerCase();
      },
      null,
      () => sub.unsubscribe()
    );
  }

  private onFieldKeyUp(event: Event) {
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }
}
