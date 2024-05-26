import { FormGroup } from "@angular/forms";
import { IProduct } from "../interfaces/iproduct";
import { CustomValidators } from "./custom-validators";
import { ProductService } from "../services/product.service";
import { IFormField } from "../interfaces/i-form-field";

export class Product implements IProduct{

    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;

    constructor(
        id = '',
        name = '',
        description = '',
        logo: '',
        date_release: '',
        date_revision: ''
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.date_release = date_release;
        this.date_revision = date_revision;
    }
    static getProductCreationFormFields(productService: ProductService): IFormField[]{
        return [
            {
              name: 'id',
              label: 'ID',
              required: true,
              pattern: '^[A-Za-z0-9]{3,10}$',
              asynValidators: [CustomValidators.productIDValidator(productService)]
            },
            {
              name: 'name',
              label: 'Nombre',
              required: true,
              pattern: '^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]{5,100}$'
            },
            {
              name: 'description',
              label: 'Descripción',
              required: true,
              pattern: '^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]{10,100}$',
              female: true
            },
            {
              name: 'logo',
              label: 'Logo',
              required: true
            },
            {
              name: 'date_release',
              label: 'Fecha liberación',
              placeholder: 'yyyy-mm-dd',
              required: true,
              pattern: '^20[0-9]{2,2}-[01]{1,1}[0-9]{1,1}-[0123]{1,1}[0-9]{1,1}$',
              female: true,
              validators: [CustomValidators.productValidateDateFormat(), CustomValidators.productValidateDateValue()],
              onValidation: (value: string, form: FormGroup) =>
                {
                  const control = form.get('date_revision');
                  if(control){
                    const releaseDate = value.split('-');
                    control.setValue(`${Number(releaseDate[0])+1}-${releaseDate[1]}-${releaseDate[2]}`);
                  }
                }
            },
            {
              name: 'date_revision',
              label: 'Fecha revisión',
              disabled: true,
              required: true
            }
          ]
    }
    static getProductEditFormFields(product: IProduct): IFormField[]{
        return [
            {
              name: 'id',
              label: 'ID',
              disabled: true,
              required: true,
              value: product.id
            },
            {
              name: 'name',
              label: 'Nombre',
              required: true,
              pattern: '^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]{5,100}$',
              value: product.name
            },
            {
              name: 'description',
              label: 'Descripción',
              required: true,
              pattern: '^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]{10,100}$',
              female: true,
              value: product.description
            },
            {
              name: 'logo',
              label: 'Logo',
              required: true,
              value: product.logo
            },
            {
              name: 'date_release',
              label: 'Fecha liberación',
              placeholder: 'yyyy-mm-dd',
              required: true,
              pattern: '^20[0-9]{2,2}-[01]{1,1}[0-9]{1,1}-[0123]{1,1}[0-9]{1,1}$',
              female: true,
              value: product.date_release,
              validators: [CustomValidators.productValidateDateFormat(), CustomValidators.productValidateDateValue()],
              onValidation: (value: string, form: FormGroup) =>
                {
                  const control = form.get('date_revision');
                  if(control){
                    const releaseDate = value.split('-');
                    control.setValue(`${Number(releaseDate[0])+1}-${releaseDate[1]}-${releaseDate[2]}`);
                  }
                }
            },
            {
              name: 'date_revision',
              label: 'Fecha revisión',
              disabled: true,
              required: true,
              value: product.date_revision
            }
          ]
    }


}
