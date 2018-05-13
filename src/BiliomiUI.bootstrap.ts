// Moment.js
// Reflect Metadata
import "reflect-metadata";
// Polyfills
import "es6-shim";
import "eventsource";
// Angular 2
import "./style/main.less";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { MainModule } from "./app/Main.module";
import { registerLocaleData } from "@angular/common";
import localeNL from "@angular/common/locales/nl";

// Zone.js
require("zone.js/dist/zone");

enableProdMode();
registerLocaleData(localeNL);
platformBrowserDynamic()
    .bootstrapModule(MainModule)
    .catch((e: any) => console.log(e));
