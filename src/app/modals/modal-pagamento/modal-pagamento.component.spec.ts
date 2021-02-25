import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagamentoComponent } from './modal-pagamento.component';

describe('ModalPagamentoComponent', () => {
  let component: ModalPagamentoComponent;
  let fixture: ComponentFixture<ModalPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
