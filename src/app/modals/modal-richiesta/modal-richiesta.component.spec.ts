import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRichiestaComponent } from './modal-richiesta.component';

describe('ModalRichiestaComponent', () => {
  let component: ModalRichiestaComponent;
  let fixture: ComponentFixture<ModalRichiestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRichiestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRichiestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
