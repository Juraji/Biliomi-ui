import { ErrorStateMatcher } from "@angular/material";
import { FormControl, NgForm } from "@angular/forms";

export class AllowTouchedFieldMatcher implements ErrorStateMatcher {

    public isErrorState(control: FormControl, form: NgForm): boolean {
        return (control && control.invalid && (control.dirty || (form && form.submitted)));
    }
}
