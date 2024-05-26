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
            const date = new Date(control.value);
            return isNaN(date.getDate()) ? { invalidDate: { value: control.value } } : null;
        };
    }
    static productValidateDateValue(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            const date = new Date(control.value);
            const currentDate = new Date(control.value);
            return date < currentDate ? { invalidDate: { value: control.value } } : null;
        };
    }
}
