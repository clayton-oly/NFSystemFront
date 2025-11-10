import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaFiscalNovaComponent } from './nota-fiscal-nova.component';

describe('NotaFiscalNovaComponent', () => {
  let component: NotaFiscalNovaComponent;
  let fixture: ComponentFixture<NotaFiscalNovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaFiscalNovaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaFiscalNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
