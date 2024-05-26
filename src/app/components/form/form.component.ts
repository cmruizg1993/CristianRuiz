import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';
import { IFormField } from '../../interfaces/i-form-field';
import { IFormButton } from '../../interfaces/i-form-button';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() fields! : IFormField[];
  @Input() buttons?: IFormButton[];
  @Output() onSubmit = new EventEmitter();
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.formBuilder.group({});
    this.fields.forEach( field => {
      
      const validations = field.validators ? field.validators: [];

      if(field.required)
        validations.push(Validators.required);

      if(field.pattern)
        validations.push(Validators.pattern(field.pattern));

      const asynValidators = field.asynValidators ? field.asynValidators: [];
      
      
      this.form.addControl(field.name, new FormControl({ value: field.value, disabled: field.disabled }, validations, asynValidators));
    });
    console.log(this.form)
  }
  evaluateControl(field: any){
    const controlName = field.name;
    const control = this.form.get(controlName)
    //console.log(control, controlName)
    let status : any = false;
    if(control){
      status =
        this.form.get(controlName)?.invalid && 
        this.form.get(controlName)?.errors && 
        (this.form.get(controlName)?.dirty || this.form.get(controlName)?.touched);
      if( !this.form.get(controlName)?.invalid && field.onValidation){
        field.onValidation(control.value, this.form);
      }
    }
      
    console.log(controlName, status, control?.errors)
    return status;
  }
  updateControl(event: any, controlName: string){
    console.log(controlName, event)
  }
  getErrorMessage(field: any){
    const control = this.form.get(field.name);
    if(control?.hasError('required')){
        return 'Campo requerido';
    }
    else{
      return `${field.label} no válid${field.female ? 'a':'o'}`;
    }
  }

  onClick(button: any){
    if(button.submit){
      this.onSubmit.emit(this.form.getRawValue());
    }
    if(button.reset){
      this.resetForm();
    }
    //return this.onButtonClick.emit({buttonName, formData});
  }
  resetForm(){
    this.form.reset();
  }
}
