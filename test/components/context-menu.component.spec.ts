import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextMenuComponent } from '../../src/app/components/context-menu/context-menu.component';



describe('ProductComponent', () => {
  let fixture: ComponentFixture<ContextMenuComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ContextMenuComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ContextMenuComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el componente ContextMenuComponent', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
