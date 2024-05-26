import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ProductService } from "../services/product.service";
import { Observable, map } from "rxjs";

export  class CustomValidators {
    static productIDValidator(productService: ProductService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const id = (control.value as string).trim().toLowerCase();
            const response$ = productService.verificationID(id);
            return response$.pipe(map(isExisting => (isExisting ? { idExists: true } : null)));;
        };
    }
    static productValidateDateFormat(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            const regex = /[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}/;
            const date = new Date(control.value);
            //console.log(regex)
            return !regex.test(control.value) || isNaN(date.getDate()) ? { invalidDateFormat: { value: control.value } } : null;
        };
    }
    static productValidateDateValue(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            const date = new Date(control.value);
            const currentDate = new Date();
            console.log(date < currentDate)
            return date < currentDate ? { invalidDateValue: { value: control.value } } : null;
        };
    }
}
