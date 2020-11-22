import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoCorsoComponent } from './modal-info-corso.component';

describe('ModalInfoCorsoComponent', () => {
  let component: ModalInfoCorsoComponent;
  let fixture: ComponentFixture<ModalInfoCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
