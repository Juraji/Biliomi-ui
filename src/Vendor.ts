// Reflect Metadata
import "reflect-metadata";

// Zone.js
require("zone.js/dist/zone");

// RxJS (Selectively, since we do not need the entire framework)
// noinspection ES6UnusedImports
import {Observable, Subscription, Subject, BehaviorSubject} from "rxjs";
// noinspection ES6UnusedImports
import {takeUntil} from "rxjs/operators";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/toPromise";

// Moment.js
import "moment";
import "moment-timezone";

// JS-Yaml
import "js-yaml";

// JS-XLSX
import "xlsx";

// Angular 2
import "@angular/platform-browser";
import "@angular/platform-browser-dynamic";
import "@angular/core";
import "@angular/common";
import "@angular/router";
import "@angular/forms";
import "@angular/common/locales/nl";
