import {Component, OnInit, ViewChild} from "@angular/core";
import {TemplatesClient} from "../../../../shared/modules/biliomi/clients/model/Templates.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {MatDialog, MatPaginator} from "@angular/material";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {XlsxExporter} from "../../../../shared/modules/xlsx-export/classes/XlsxExporter";
import {Dictionary} from "../../../../shared/modules/tools/FunctionalInterface";
import {EditTemplateModalComponent} from "./declarations/EditTemplateModal.component";
import {ActivatedRoute, ParamMap} from "@angular/router";
import ITemplate = Biliomi.ITemplate;
import {StringUtils} from "../../../../shared/modules/tools/StringUtils";

@Component({
  selector: "template-settings-component",
  templateUrl: require("./TemplateSettings.template.pug")
})
export class TemplateSettingsComponent implements OnInit {
  private _templatesClient: TemplatesClient;
  private _dialog: MatDialog;
  private _activatedRoute: ActivatedRoute;
  private dataSource: RestTableDataSource<ITemplate> = new RestTableDataSource<ITemplate>();

  public exportConfig: IXlsxExportConfig = {
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

  constructor(templatesClient: TemplatesClient, dialog: MatDialog, activatedRoute: ActivatedRoute) {
    this._templatesClient = templatesClient;
    this._dialog = dialog;
    this._activatedRoute = activatedRoute;

    this.dataSource.bindClient(this._templatesClient);
    this.dataSource.sortBuilder.add("TemplateKey")
  }

  public async ngOnInit() {
    await this.dataSource.update();

    this._activatedRoute.paramMap.subscribe((map: ParamMap) => {
      if (map.has("template")) {
        let templateKey: string = map.get("template");
        let template: ITemplate = this.dataSource.data
          .filter((template: ITemplate) => StringUtils.equalsIgnoreCase(template.TemplateKey, templateKey))
          .pop();

        if (template != null) {
          this.editTemplate(template);
        }
      }
    });
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
}
