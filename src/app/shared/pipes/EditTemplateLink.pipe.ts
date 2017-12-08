import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "editTemplateLink"})
export class EditTemplateLinkPipe implements PipeTransform {

  public transform(templateKey: string): string {
    if (templateKey == null || templateKey.length == 0) {
      return templateKey;
    }

    return "/dash/system/system-settings/templates/" + templateKey;
  }
}
