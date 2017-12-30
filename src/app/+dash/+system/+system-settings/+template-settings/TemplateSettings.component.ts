import {Component, OnInit} from "@angular/core";
import {TemplatesClient} from "../../../../shared/modules/biliomi/clients/model/Templates.client";
import {Biliomi} from "../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {RestTableDataSource} from "../../../../shared/modules/data-table/classes/RestTableDataSource";
import {MatDialog} from "@angular/material";
import {IXlsxExportConfig} from "../../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import {EditTemplateModalComponent} from "./declarations/EditTemplateModal.component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {StringUtils} from "../../../../shared/modules/tools/StringUtils";
import {XLSX_FORMATTER_DICTIONARY_KEY_VALUE_PAIR} from "../../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import {RouterUtils} from "../../../../shared/modules/tools/RouterUtils";
import ITemplate = Biliomi.ITemplate;
import {TableFilterNameMapping} from "../../../../shared/modules/data-table/classes/interfaces/DataTable";

@Component({
  selector: "template-settings-component",
  templateUrl: require("./TemplateSettings.template.pug")
})
export class TemplateSettingsComponent implements OnInit {
  private _templatesClient: TemplatesClient;
  private _dialog: MatDialog;
  private _activatedRoute: ActivatedRoute;
  private _router: Router;
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
        formatter: XLSX_FORMATTER_DICTIONARY_KEY_VALUE_PAIR
      }
    ]
  };

  public tableFilterMapping: TableFilterNameMapping = {
    "Key": "TemplateKey"
  };

  constructor(templatesClient: TemplatesClient,
              dialog: MatDialog,
              activatedRoute: ActivatedRoute,
              router: Router) {
    this._templatesClient = templatesClient;
    this._dialog = dialog;
    this._activatedRoute = activatedRoute;
    this._router = router;

    this.dataSource.client = this._templatesClient;
    this.dataSource.sortBuilder.add("TemplateKey");
  }

  public async ngOnInit() {
    await this.dataSource.update();

    this._activatedRoute.paramMap.subscribe((map: ParamMap) => {
      if (map.has("template")) {
        let templateKey: string = map.get("template");
        let template: ITemplate = this.dataSource.currentData
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
      width: "600px",
      data: (template ? template.Id : null)
    });

    dialogRef.afterClosed()
      .filter(() => !RouterUtils.routeEndsWith(this._activatedRoute, "templates"))
      .subscribe(() => this._router.navigateByUrl(RouterUtils.routeToUrl(this._activatedRoute.parent)));

    dialogRef.afterClosed()
      .filter((success: boolean) => success)
      .subscribe(() => this.dataSource.update());
  }
}
