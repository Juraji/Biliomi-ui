import { Component, Input } from "@angular/core";

@Component({
    selector: "edit-template-button",
    templateUrl: require("./EditTemplateButton.template.html")
})
export class EditTemplateButtonComponent {

    @Input("templateKey")
    public templateKey: string;

    public get templateEditLink(): string {
        const templateUriPrefix = "/dash/system/system-settings/templates/";

        if (this.templateKey == null) {
            return null;
        }

        return templateUriPrefix + this.templateKey;
    }
}
