import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponent } from '../../src/app/product/product/product.component';


describe('ProductComponent', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProductComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el componente ProductComponent', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



});
