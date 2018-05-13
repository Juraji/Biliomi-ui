import { Biliomi } from "./interfaces/Biliomi";
import ITemplate = Biliomi.ITemplate;

export class TemplateKeyDescriptions {
    private _descriptions: { [key: string]: string };

    constructor(template: ITemplate) {
        if (template.KeyDescriptions != null) {
            this._descriptions = template.KeyDescriptions;
            this._keys = Object
                .keys(this._descriptions)
                .sort((a: string, b: string) => a.localeCompare(b));
            this._keysWithBrackets = this._keys
                .map((key: string) => " {{" + key + "}} ");
        } else {
            this._descriptions = {};
            this._keys = [];
            this._keysWithBrackets = [];
        }
    }

    private _keys: string[];

    public get keys(): string[] {
        return this._keys;
    }

    private _keysWithBrackets: string[];

    get keysWithBrackets(): string[] {
        return this._keysWithBrackets;
    }

    public get length(): number {
        return this.keys.length;
    }

    public getKeyAt(index: number, withBrackets?: boolean): string {
        if (this._keys.length > index) {
            if (withBrackets) {
                return this._keysWithBrackets[index];
            } else {
                return this._keys[index];
            }
        } else {
            return null;
        }
    }

    public getDescription(key: string) {
        if (key.indexOf(" {{") === 0) {
            key = key.substring(3, key.length - 3);
        }

        if (this._descriptions.hasOwnProperty(key)) {
            return this._descriptions[key];
        } else {
            return null;
        }
    }
}
