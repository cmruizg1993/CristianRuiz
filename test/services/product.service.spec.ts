import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from '../../src/app/services/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IProduct } from '../../src/app/interfaces/iproduct';
import { environment } from '../../src/environments/environment.development';



describe('TestService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule
        ]
    });
    //TestBed.inject(HttpClient);
    service = TestBed.inject(ProductService);
    service.urlBase = environment.apiUrl;
  });

  it('Se debe crear el servicio ProductServices', () => {
    expect(service).toBeTruthy();
  });
  
  it('Debe crear un producto', (done) => {
    
    const dateNow = new Date();
    const dateAfterYear = new Date();
    dateAfterYear.setFullYear(dateAfterYear.getFullYear() + 1); 
    const id = `${Math.floor(Math.random()*999999999)}`;

    const product: IProduct = {
        id: id,
        name: `Test product ${id}`,
        description: 'Descripción ...',
        logo: 'assets-1.png',
        date_release: `${dateNow.toISOString().split('T')[0]}`,
        date_revision: `${dateAfterYear.toISOString().split('T')[0]}`
    }
    
    
    service.createProduct(product)
    .then( (data: any) =>{
        console.log(data)
        expect(true).toBeTruthy();
        done();
    })
    .catch(err =>{
        expect(false).toBeTruthy();  
        done();
    })
    .finally(()=>{
        expect(false).toBeTruthy();  
        done();
    });

  });
});
