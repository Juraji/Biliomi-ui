import {ActivatedRoute, ActivatedRouteSnapshot, UrlSegment} from "@angular/router";

export class RouterUtils {
  public static routeEndsWith(activatedRoute: ActivatedRoute, url: string) {
    return this.routeToUrl(activatedRoute).endsWith(url);
  }

  public static routeToUrl(activatedRoute: ActivatedRoute): string {
    return activatedRoute.snapshot.pathFromRoot
      .map((snapshot: ActivatedRouteSnapshot) => this.joinUrlSegments(snapshot.url))
      .reduce((l: string, r: string) => l + r, "");
  }

  public static joinUrlSegments(segments: UrlSegment[]): string {
    return segments
      .map((seg: UrlSegment) => seg.path)
      .reduce((l: string, r: string) => l + "/" + r, "");
  }
}
