import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../src/app/app.component';
import { LoaderComponent } from '../src/app/shared/loader/loader.component';
import { HeaderComponent } from '../src/app/shared/header/header.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, LoaderComponent, HeaderComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear la app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Debe coincidir con el snapshot'`, () => {
    const app = fixture.componentInstance;
    expect(compiled).toMatchSnapshot();
  });


});
