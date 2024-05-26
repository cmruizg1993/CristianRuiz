import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../src/app/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../../src/app/components/components.module';
import { FormComponent } from '../../src/app/components/form/form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProduct } from '../../src/app/interfaces/iproduct';
import { environment } from '../../src/environments/environment.development';
import { IndexComponent } from '../../src/app/product/index/index.component';



describe('Product/IndexComponent', () => {
  let service: ProductService;
  let fixture: ComponentFixture<IndexComponent>;
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
        IndexComponent
      ],
      providers:[
        ProductService
      ]
    }).compileComponents();
    
    service = TestBed.inject(ProductService);
    service.urlBase = environment.apiUrl;
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(IndexComponent);
    
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el Product/IndexComponent', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`Debe renderizar el  TableComponent'`, () => {
    const table = compiled.querySelector('app-table table');
    const th = table?.querySelectorAll('th');
    expect(th?.length).toBe(7);
  });

  it(`Debe obtener productos'`, () => {

    const component = fixture.componentInstance;
    
    fixture.detectChanges();

    const request = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect( request.request.method ).toBe('GET');
    request.flush( [] );

  });

});
