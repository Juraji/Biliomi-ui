import {ModuleWithProviders, Provider, Type} from "@angular/core";

export abstract class ServicesLibrary implements ModuleWithProviders {
  ngModule: Type<any>;
  providers: Provider[];

  constructor(module: Type<any>) {
    this.ngModule = module;
    this.providers = [];
  }
}
