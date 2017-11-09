import {ErrorStateMatcher} from "@angular/material";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

export class DefaultFormFieldStateMatcher implements ErrorStateMatcher {

  public isErrorState(control: FormControl | any, form: FormGroupDirective | NgForm | any): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
