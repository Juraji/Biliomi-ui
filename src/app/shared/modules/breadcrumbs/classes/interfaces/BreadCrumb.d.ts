import {Params} from "@angular/router";

interface Crumb {
  name: string;
  params: Params;
  queryParams: Params;
  url: string;
}