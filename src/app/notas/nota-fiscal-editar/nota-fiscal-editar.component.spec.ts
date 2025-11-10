import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaFiscalEditarComponent } from './nota-fiscal-editar.component';

describe('NotaFiscalEditarComponent', () => {
  let component: NotaFiscalEditarComponent;
  let fixture: ComponentFixture<NotaFiscalEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaFiscalEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaFiscalEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
