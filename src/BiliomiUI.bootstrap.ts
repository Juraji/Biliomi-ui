import "./style/main.less";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {MainModule} from "./app/Main.module";

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(MainModule)
  .catch((e: any) => console.log(e));
