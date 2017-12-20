import {Directive, ViewContainerRef} from "@angular/core";

@Directive({selector: '[extCdkTablePlaceHolder]'})
export class ExtCdkTablePlaceHolderDirective {
  private _viewContainer: ViewContainerRef;

  constructor(viewContainer: ViewContainerRef) {
    this._viewContainer = viewContainer;
  }

  public get viewContainer(): ViewContainerRef {
    return this._viewContainer
  }
}
