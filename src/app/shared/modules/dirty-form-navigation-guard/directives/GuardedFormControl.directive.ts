import {Directive, forwardRef, Inject, OnDestroy, OnInit, Optional, Self} from "@angular/core";
import {
  AsyncValidator, AsyncValidatorFn, ControlValueAccessor, FormControlDirective, NG_ASYNC_VALIDATORS,
  NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgForm, Validator, ValidatorFn
} from "@angular/forms";
import {FormControlRegisterService} from "../services/FormControlRegister.service";
import {Subscription} from "rxjs/Subscription";

const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlDirective)
};

@Directive({
  selector: "[formControl]",
  providers: [formControlBinding], exportAs: "ngForm",
  host: {
    "class": "dirty-form-guard"
  }
})
export class GuardedFormControlDirective extends FormControlDirective implements OnInit, OnDestroy {
  private _formControlRegisterService: FormControlRegisterService;
  private _parentFormSubmitSub: Subscription;
  private _parentForm: NgForm;

  constructor(@Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>,
              @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<AsyncValidator | AsyncValidatorFn>,
              @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
              @Optional() parentForm: NgForm,
              formControlRegisterService: FormControlRegisterService) {
    super(validators, asyncValidators, valueAccessors);
    this._parentForm = parentForm;
    this._formControlRegisterService = formControlRegisterService;
  }

  public ngOnInit(): void {
    if (this._parentForm) {
      // If there is a parent form, subscribe to its submit event in order to reset the dirty state of this control
      // If no parent form is present the formcontrol needs to be reset manually
      this._parentFormSubmitSub = this._parentForm.ngSubmit
        .subscribe(() => this.reset(this.value));
    }

    // Register this control with the formcontrols register.
    this._formControlRegisterService.registerControl(this.control);
  }

  public ngOnDestroy(): void {
    if (this._parentFormSubmitSub) {
      this._parentFormSubmitSub.unsubscribe();
    }
  }
}
