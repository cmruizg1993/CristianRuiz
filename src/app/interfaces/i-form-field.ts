import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface IFormField {
    name: string;
    placeholder?:string;
    label?: string;
    required?: boolean;
    pattern?: string;
    female?: boolean;
    onValidation?: CallableFunction;
    asynValidators?: AsyncValidatorFn[];
    validators?: ValidatorFn[];
    disabled?: boolean;
    value?: any;
}
