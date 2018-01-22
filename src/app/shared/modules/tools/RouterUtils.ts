import {ActivatedRoute, ActivatedRouteSnapshot, Route, Routes, UrlSegment} from "@angular/router";

export class RouterUtils {
  public static routeEndsWith(activatedRoute: ActivatedRoute, url: string) {
    return this.routeToUrl(activatedRoute).endsWith(url);
  }

  public static routeToUrl(activatedRoute: ActivatedRoute, ...append: string[]): string {
    let url: string = activatedRoute.snapshot.pathFromRoot
      .map((snapshot: ActivatedRouteSnapshot) => this.joinUrlSegments(snapshot.url))
      .reduce((l: string, r: string) => l + r, "");

    if (append.length > 0) {
      url += append.reduce((l: string, r: string) => l + "/" + r, "");
    }

    return url;
  }

  public static joinUrlSegments(segments: UrlSegment[]): string {
    return segments
      .map((seg: UrlSegment) => seg.path)
      .reduce((l: string, r: string) => l + "/" + r, "");
  }
}
