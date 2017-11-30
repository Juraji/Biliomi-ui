import {IXlsxExportConfig} from "../../../shared/modules/xlsx-export/classes/interfaces/Xlsx.interface";
import {Biliomi} from "../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import {TimeUtils} from "../../../shared/modules/ts-utilities/TimeUtils";
import {
  XLSX_FORMATTER_BOOLEAN_YES_NO,
  XLSX_FORMATTER_JOIN_LIST
} from "../../../shared/modules/xlsx-export/classes/constants/XlsxValueFormatters";
import IUserGroup = Biliomi.IUserGroup;

export const CUSTOM_COMMANDS_EXPORT_DEFINITION: IXlsxExportConfig = {
  fileName: "Biliomi - Custom Commands",
  sheetName: "Custom Commands",
  columns: [
    {
      objectPath: "Command",
      prefix: "!"
    },
    {
      objectPath: "UserGroup.Name",
      headerName: "User Group",
    },
    {
      objectPath: "Price"
    },
    {
      objectPath: "Price",
      headerName: "Price formatted",
      suffix: " Bolts"
    },
    {
      objectPath: "Cooldown"
    },
    {
      objectPath: "Cooldown",
      headerName: "Cooldown formatted",
      formatter: cellValue => TimeUtils.millisToRelTimeStrHMS(cellValue, false, true)
    },
    {
      objectPath: "Aliasses",
      formatter: XLSX_FORMATTER_JOIN_LIST
    },
    {
      objectPath: "Message"
    }
  ]
};

export const SYSTEM_COMMANDS_EXPORT_DEFINITION: IXlsxExportConfig = {
  fileName: "Biliomi - System Commands",
  sheetName: "System Commands",
  columns: [
    {
      objectPath: "Command",
      prefix: "!"
    },
    {
      objectPath: "UserGroup.Name",
      headerName: "User Group"
    },
    {
      objectPath: "SystemCommand",
      headerName: "System Command",
      formatter: XLSX_FORMATTER_BOOLEAN_YES_NO
    },
    {
      objectPath: "ModeratorCanAlwaysActivate",
      headerName: "Moderator Can Always Activate",
      formatter: XLSX_FORMATTER_BOOLEAN_YES_NO
    },
    {
      objectPath: "Price",
      suffix: " Bolts"
    },
    {
      objectPath: "Price",
      headerName: "Price formatted",
      suffix: " Bolts"
    },
    {
      objectPath: "Cooldown"
    },
    {
      objectPath: "Cooldown",
      headerName: "Cooldown formatted",
      formatter: cellValue => TimeUtils.millisToRelTimeStrHMS(cellValue, false, true)
    },
    {
      objectPath: "Aliasses",
      formatter: XLSX_FORMATTER_JOIN_LIST
    }
  ]
};
