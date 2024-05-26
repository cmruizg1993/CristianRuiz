import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateComponent } from '../../src/app/product/create/create.component';
import { ProductService } from '../../src/app/services/product.service';
import { ComponentsModule } from '../../src/app/components/components.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../src/environments/environment.development';



describe('Product/CreateComponent', () => {
  let service: ProductService;
  let fixture: ComponentFixture<CreateComponent>;
  let compiled: HTMLElement;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ComponentsModule
      ],
      declarations: [
        CreateComponent
      ],
      providers:[
        ProductService
      ]
    }).compileComponents();
    
    service = TestBed.inject(ProductService);
    service.urlBase = environment.apiUrl;
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CreateComponent);
    
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el Product/CreateComponent', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`Debe coincidir con el snapshot'`, () => {
    expect(compiled).toMatchSnapshot();
  });
  it(`Debe renderizar el form Component'`, () => {
    const form = compiled.querySelector('app-form>form');
    const inputs = form?.querySelectorAll('input');
    expect(inputs?.length).toBe(6);
  });
  it(`Debe crear un producto'`, () => {
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

    const component = fixture.componentInstance;

    component.getFormData(product);
    
    fixture.detectChanges();

    const request = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect( request.request.method ).toBe('POST');
    request.flush( product );

  });

});
