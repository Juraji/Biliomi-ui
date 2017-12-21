import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({selector: '[extCdkTablePlaceHolder]'})
export class ExtCdkTablePlaceHolderDirective implements OnInit {
  private _viewContainer: ViewContainerRef;

  @Input("template")
  public template: TemplateRef<any> = null;

  constructor(viewContainer: ViewContainerRef) {
    this._viewContainer = viewContainer;
  }

  public ngOnInit() {
    if (this.template != null) {
      this._viewContainer.createEmbeddedView(this.template);
    }
  }

  public get viewContainer(): ViewContainerRef {
    return this._viewContainer
  }
}
