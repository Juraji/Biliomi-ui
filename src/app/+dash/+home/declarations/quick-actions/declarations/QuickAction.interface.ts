export const QUICK_ACTIONS_STORAGE_KEY: string = "quickActions";

export enum QuickActionType {
  COMMAND = "COMMAND",
  PAGE = "PAGE",
  URL = "URL"
}

export interface QuickAction {
  name: string;
  type: QuickActionType;
  execute: string;
}
