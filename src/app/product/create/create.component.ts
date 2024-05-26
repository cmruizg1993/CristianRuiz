import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/iproduct';
import { IFormField } from '../../interfaces/i-form-field';
import { Product } from '../../classes/product';
import { IFormButton } from '../../interfaces/i-form-button';
import { ModalSettings } from '../../classes/modal-settings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  error = false;
  fields: IFormField[];
  buttons: IFormButton[];
  modalSettings: ModalSettings;
  constructor(
    public productService: ProductService,
    private router: Router
  ){
    this.fields = Product.getProductCreationFormFields(productService);

    this.buttons = [
      {
        label: 'Reiniciar',
        reset: true
      },
      {
        label: 'Enviar',
        primary: true,
        validForm: true,
        submit: true
      }
    ]
    this.modalSettings = new ModalSettings();
  }
  getFormData(product: IProduct){
    this.productService.createProduct(product)
    .then(value => {
      this.error = false;
      this.modalSettings.cancelButton = false;
      this.modalSettings.confirmButton = true;
      this.modalSettings.content = `El  producto se ha creado correctamente.`;
      this.modalSettings.confirmAction = () => {
        this.router.navigate(['/']);
      }
      this.modalSettings.open();
    })
    .catch(err => {
      console.log(err)
      this.error = true;
      this.modalSettings.cancelButton = false;
      this.modalSettings.confirmButton = true;
      this.modalSettings.content = `Hubo un error al crear el producto.`;
      this.modalSettings.confirmButtonLabel = 'Aceptar';
      this.modalSettings.confirmAction = () => {
        this.modalSettings.close();
      }
      this.modalSettings.open();
    });
  }
}


