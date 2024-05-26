import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { IHeader } from '../../interfaces/iheader';
import { IContextMenu } from '../../interfaces/i-context-menu';
import { Router } from '@angular/router';
import { ModalSettings } from '../../classes/modal-settings';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  products: Product[];
  filteredProducts: Product[];
  headers: IHeader[];
  context: IContextMenu;
  modalSettings: ModalSettings;
  constructor(
    private productService: ProductService,
    private router: Router
  ){
    this.products = [];
    this.filteredProducts = [];
    this.headers = [ 
      { key: 'id', label: 'Id', hidden: true }, 
      { key: 'logo', label: 'Logo', isImage: true }, 
      { key: 'name', label: 'Nombre del prducto' }, 
      { key: 'description', label: 'Descripcion', info: 'Representa a descripción del producto financiero' }, 
      { key: 'date_release', label: 'Fecha de liberación', info: 'Representa la fecha de liberación del producto financiero' }, 
      { key: 'date_revision', label: 'Fecha de reestructuración',  info: 'Representa la fecha de revisión del producto financiero' } ];
    this.context = {        
      items: [
        {
          label: 'Editar',
          action: (data: any)=>{ 
            //console.log('Editar', data);
            this.router.navigateByUrl('/edit', { state: data });
          }
        },
        {
          label: 'Eliminar',
          action: (data: any)=>{ 
            this.modalSettings.cancelButton = true;
            this.modalSettings.confirmButton = true;
            this.modalSettings.content = `Esta seguro que desea eliminar el producto "${data.name}"`;
            this.modalSettings.confirmAction = () => {
              productService.deleteProduct(data).then(()=> window.location.reload());
            }
            this.modalSettings.cancelAction = () => {
              this.modalSettings.close();
            }
            this.modalSettings.open();
          }
        }
      ]
    } 
    this.modalSettings = new ModalSettings();
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService.getProducts()
      .then((result: Product[]) => {
        this.products = result;   
        this.filteredProducts = this.products.slice();     
      })
      .catch( err => {
        //console.log(err);
      })
  }
  onFilterUpdate(event: string){
    //console.log('Filter updated: ', event);
    this.filteredProducts = this.products.filter( p => 
      p.id.toUpperCase().indexOf(event.toUpperCase()) >= 0|| 
      p.name.toUpperCase().indexOf(event.toUpperCase()) >= 0 ||
      p.description.toUpperCase().indexOf(event.toUpperCase()) >= 0||
       p.date_release.toUpperCase().indexOf(event.toUpperCase()) >= 0 || 
       p.date_revision.toUpperCase().indexOf(event.toUpperCase()) >= 0
      );
    //console.log(this.filteredProducts)
  }
  agregarProducto(){
    this.router.navigate(['/create']);
  }
}
