import { QuickActionType } from "./QuickAction.enum";

interface QuickAction {
    name: string;
    type: QuickActionType;
    execute: string;
}
