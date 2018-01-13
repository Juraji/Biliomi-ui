import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "editUserLink"})
export class EditUserLinkPipe implements PipeTransform {

  public transform(username: string): string {
    if (username == null || username.length === 0) {
      return username;
    }

    return "/dash/system/users/edit/" + username.toLowerCase();
  }
}
