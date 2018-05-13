import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Biliomi } from "../../../../../shared/modules/biliomi/classes/interfaces/Biliomi";
import IModerationAction = Biliomi.IModerationAction;

@Component({
    selector: "strike-selector",
    templateUrl: require("./StrikeSelector.template.html")
})
export class StrikeSelectorComponent {
    @Output("strikeChange")
    public strikeChange: EventEmitter<IModerationAction> = new EventEmitter<IModerationAction>();
    @Input("placeholder")
    public placeholderName: string;
    private selectedStrikeControl: FormControl = new FormControl(IModerationAction.WARN, [Validators.required]);

    constructor() {
        this.selectedStrikeControl.valueChanges
            .subscribe((a: IModerationAction) => this.strikeChange.next(a));
    }

    @Input("strike")
    public get strike(): IModerationAction {
        return this.selectedStrikeControl.value;
    }

    public set strike(value: IModerationAction) {
        this.selectedStrikeControl.reset(value);
    }

    public get valid(): boolean {
        return this.selectedStrikeControl.valid;
    }
}
