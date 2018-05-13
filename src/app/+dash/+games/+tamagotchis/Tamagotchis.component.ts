import { Component, OnInit } from "@angular/core";
import { TamagotchisClient } from "../../../shared/modules/biliomi/clients/model/Tamagotchis.client";
import { RestTableDataSource } from "../../../shared/modules/data-table/classes/RestTableDataSource";
import { Biliomi } from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import { TableFilterNameMapping } from "../../../shared/modules/data-table/classes/interfaces/DataTable";
import {
    XLSX_FORMATTER_BOOLEAN_YES_NO,
    XLSX_FORMATTER_DATE
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import { IXlsxExportConfig } from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx";
import { CaseToWordPipe, CaseType } from "../../../shared/pipes/CaseToWord.pipe";
import { TamagotchiSettingsClient } from "../../../shared/modules/biliomi/clients/settings/TamagotchiSettings.client";
import { NumberUtils } from "../../../shared/modules/tools/NumberUtils";

import "./Tamagotchis.less";
import ITamagotchi = Biliomi.ITamagotchi;
import ITamagotchiToy = Biliomi.ITamagotchiToy;
import IGender = Biliomi.IGender;

@Component({
    selector: "tamagotchis",
    templateUrl: require("./Tamagotchis.template.html")
})
export class TamagotchisComponent implements OnInit {
    public dataSource: RestTableDataSource<ITamagotchi> = new RestTableDataSource<ITamagotchi>();
    public filterMapping: TableFilterNameMapping = {};
    public exportConfig: IXlsxExportConfig = {
        fileName: "Biliomi - Tamagotchis",
        sheetName: "Tamagotchis",
        columns: [
            {objectPath: "$.Name", headerName: "Name"},
            {objectPath: "$.Species", headerName: "Species"},
            {objectPath: "$.Owner.DisplayName", headerName: "Owner"},
            {
                objectPath: "$.Gender",
                headerName: "Gender",
                formatter: (g: IGender) => new CaseToWordPipe().transform(g, CaseType.ENUM)
            },
            {objectPath: "$.FoodStack", headerName: "FoodStack"},
            {objectPath: "$.MoodLevel", headerName: "MoodLevel"},
            {objectPath: "$.HygieneLevel", headerName: "HygieneLevel"},
            {objectPath: "$.Affection", headerName: "Affection"},
            {objectPath: "$.Deceased", headerName: "Deceased", formatter: XLSX_FORMATTER_BOOLEAN_YES_NO},
            {objectPath: "$.DateOfBirth", headerName: "DateOfBirth", formatter: XLSX_FORMATTER_DATE},
            {objectPath: "$.DateOfDeath", headerName: "DateOfDeath", formatter: XLSX_FORMATTER_DATE},
            {
                objectPath: "$.Toys", headerName: "Toys", formatter: (ts: ITamagotchiToy[]) => ts
                    .map((t: ITamagotchiToy) => t.ToyName)
                    .reduce((l: string, r: string) => l + ", " + r, "")
            }
        ]
    };
    private _tamagotchiSettingsClient: TamagotchiSettingsClient;

    constructor(tamagotchisClient: TamagotchisClient,
                tamagotchiSettingsClient: TamagotchiSettingsClient) {
        this.dataSource.client = tamagotchisClient;
        this._tamagotchiSettingsClient = tamagotchiSettingsClient;
    }

    public ngOnInit() {
        this._tamagotchiSettingsClient.load();
    }

    public getFoodPercentage(tamagotchi: ITamagotchi): number {
        return NumberUtils.percentage(tamagotchi.FoodStack, this._tamagotchiSettingsClient.MaxFood, true);
    }

    public getMoodPercentage(tamagotchi: ITamagotchi): number {
        return NumberUtils.percentage(tamagotchi.MoodLevel, this._tamagotchiSettingsClient.MaxMood, true);
    }

    public getHygienePercentage(tamagotchi: ITamagotchi): number {
        return NumberUtils.percentage(tamagotchi.HygieneLevel, this._tamagotchiSettingsClient.MaxHygiene, true);
    }
}
