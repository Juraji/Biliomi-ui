import {Component, OnInit, ViewChild} from "@angular/core";
import {TemplatesClient} from "../../../../shared/modules/biliomi/clients/model/Templates.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {RestMatDataSource} from "../../../../shared/modules/ng-material/classes/RestMatDataSource.class";
import {MatDialog, MatPaginator} from "@angular/material";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {XlsxExporter} from "../../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {Dictionary} from "../../../../shared/modules/tools/FunctionalInterface";
import {EditTemplateModalComponent} from "./declarations/EditTemplateModal.component";
import ITemplate = Biliomi.ITemplate;

@Component({
  selector: "template-settings-component",
  templateUrl: require("./TemplateSettings.template.pug")
})
export class TemplateSettingsComponent implements OnInit {
  private _templatesClient: TemplatesClient;
  private dataSource: RestMatDataSource<ITemplate> = new RestMatDataSource<ITemplate>();

  @ViewChild("paginator", {read: MatPaginator})
  private paginator: MatPaginator;
  private _dialog: MatDialog;

  constructor(templatesClient: TemplatesClient, dialog: MatDialog) {
    this._templatesClient = templatesClient;
    this._dialog = dialog;

    this.dataSource.bindClient(this._templatesClient);
    this.dataSource.sortBuilder.add("TemplateKey")
  }

  public async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.update();
  }

  private editTemplate(template: ITemplate) {
    let dialogRef = this._dialog.open(EditTemplateModalComponent, {
      width: '600px',
      data: (template ? template.Id : null)
    });

    dialogRef.afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.dataSource.update());
  }

  private exportTemplates() {
    let config: IXlsxExportConfig = {
      fileName: "Biliomi - Users",
      sheetName: "Users",
      columns: [
        {objectPath: "$.TemplateKey", headerName: "Key"},
        {objectPath: "$.Template", headerName: "Template"},
        {objectPath: "$.Description", headerName: "Description"},
        {
          objectPath: "$.KeyDescriptions",
          headerName: "Replacements",
          formatter: (descriptions: Dictionary) => Object
            .keys(descriptions)
            .map((key: string) => key + ": " + descriptions[key])
            .join(", ")
        },
      ]
    };
    let exporter = new XlsxExporter(config);
    exporter.exportData(this.dataSource.data);
  }
}
