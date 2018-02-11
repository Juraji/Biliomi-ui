import {AfterViewInit, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {TemplatesClient} from "../../../../../shared/modules/biliomi/clients/model/Templates.client";
import {Biliomi} from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {FormControl} from "@angular/forms";
import {TemplateKeyDescriptions} from "../../../../../shared/modules/biliomi/classes/TemplateKeyDescriptions";
import {CaseToWordPipe, CaseType} from "../../../../../shared/pipes/CaseToWord.pipe";
import ITemplate = Biliomi.ITemplate;

@Component({
  selector: "edit-template-modal-component",
  templateUrl: require("./EditTemplateModal.template.html")
})
export class EditTemplateModalComponent implements AfterViewInit {
  private _templateId: number;
  private _templatesClient: TemplatesClient;
  private _dialogRef: MatDialogRef<EditTemplateModalComponent>;
  private _matSnackBar: MatSnackBar;

  private editedTemplate: ITemplate;
  private templateKeys: TemplateKeyDescriptions;
  private templateControl: FormControl = new FormControl("");

  constructor(@Inject(MAT_DIALOG_DATA) templateId: number,
              templatesClient: TemplatesClient,
              dialogRef: MatDialogRef<EditTemplateModalComponent>,
              matSnackBar: MatSnackBar) {
    this._templateId = templateId;
    this._templatesClient = templatesClient;
    this._dialogRef = dialogRef;
    this._matSnackBar = matSnackBar;
  }

  public async ngAfterViewInit() {
    this.editedTemplate = await this._templatesClient.get(this._templateId);
    this.templateKeys = new TemplateKeyDescriptions(this.editedTemplate);
    this.initFields();
  }

  public initFields() {
    this.templateControl.reset(this.editedTemplate.Template);
  }

  // When pressing ALT+[1-9] the corresponding replacement key for this template is inserted at the caret or selection
  public templateFieldOnKeyUp(event: KeyboardEvent) {
    const numRangeStart: number = 49;
    const numRangeEnd: number = 57;

    if (event.altKey && (event.keyCode >= numRangeStart && event.keyCode <= numRangeEnd)) {
      event.preventDefault();
      let element: HTMLTextAreaElement = (event.target as HTMLTextAreaElement);
      let key: string = this.templateKeys.getKeyAt(event.keyCode - numRangeStart, true);

      if (key != null) {
        let selectionStart = element.selectionStart;
        let selectionEnd = element.selectionEnd;
        let beforeSelection: string = element.value.substring(0, selectionStart).trim();
        let afterSelection: string = element.value.substring(selectionEnd, element.value.length).trim();
        this.templateControl.reset(beforeSelection + key + afterSelection);
        element.selectionStart = selectionStart + key.length;
        element.selectionEnd = selectionStart + key.length;
      }
    }
  }

  public async save() {
    let template: ITemplate = {...this.editedTemplate};
    let persistedTemplate: ITemplate;

    template.Template = this.templateControl.value;

    persistedTemplate = await this._templatesClient.put(this._templateId, template);
    if (persistedTemplate == null) {
      let templateTitle = new CaseToWordPipe().transform(this.editedTemplate.TemplateKey, CaseType.TITLE);
      this._matSnackBar.open("Could not save template " + templateTitle + ", check your input.", "Ok");
    } else {
      this._dialogRef.close(true);
    }
  }

  public cancelEdit() {
    this._dialogRef.close(false);
  }
}
