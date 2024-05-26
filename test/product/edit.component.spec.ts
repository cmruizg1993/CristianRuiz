import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateComponent } from '../../src/app/product/create/create.component';
import { ProductService } from '../../src/app/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../../src/app/components/components.module';
import { FormComponent } from '../../src/app/components/form/form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProduct } from '../../src/app/interfaces/iproduct';
import { environment } from '../../src/environments/environment.development';
import { EditComponent } from '../../src/app/product/edit/edit.component';
import { Router } from '@angular/router';



describe('Product/EditComponent', () => {
  let service: ProductService;
  let fixture: ComponentFixture<EditComponent>;
  let compiled: HTMLElement;
  let httpMock: HttpTestingController;
  let router: Router;

  const dateNow = new Date();
    const dateAfterYear = new Date();
    dateAfterYear.setFullYear(dateAfterYear.getFullYear() + 1); 
    const id = `${Math.floor(Math.random()*999999999)}`;

    const product: any = {
      id: id,
      name: `Test product ${id}`,
      description: 'Descripción ...',
      logo: 'assets-1.png',
      date_release: `${dateNow.toISOString().split('T')[0]}`,
      date_revision: `${dateAfterYear.toISOString().split('T')[0]}`
    }

  beforeEach(async () => {
    

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'edit',
            component: EditComponent,
            data: product
          }
        ]),
        HttpClientTestingModule,
        ComponentsModule
      ],
      declarations: [
        EditComponent
      ],
      providers:[
        ProductService,
      ]
    }).compileComponents();
    
    router = TestBed.inject(Router);

    jest.spyOn(router, "getCurrentNavigation").mockReturnValueOnce({ extras: { state: product } } as any);

    service = TestBed.inject(ProductService);
    service.urlBase = environment.apiUrl;
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditComponent);
    
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el Product/EditComponent', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`Debe coincidir con el snapshot'`, () => {
    expect(compiled).toMatchSnapshot();
  });
  it(`Debe renderizar el form Component'`, () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const form = compiled.querySelector('app-form>form');
    const inputs = form?.querySelectorAll('input');
    expect(inputs?.length).toBe(6);
  });
  it(`El formulaio debe contener el ID : ${product.id}'`, () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    
    const form = compiled.querySelector('app-form>form');
    const inputs = form?.querySelectorAll('input');
    expect(inputs?.item(0).value).toBe(product.id);
  });
  it(`Debe editar un producto'`, () => {
    
    const component = fixture.componentInstance;

    component.getFormData(product);
    
    fixture.detectChanges();

    const request = httpMock.expectOne(`${environment.apiUrl}/products/${product.id}`);
    expect( request.request.method ).toBe('PUT');
    request.flush( product );

  });

});
