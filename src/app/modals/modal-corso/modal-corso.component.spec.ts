import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCorsoComponent } from './modal-corso.component';

describe('ModalCorsoComponent', () => {
  let component: ModalCorsoComponent;
  let fixture: ComponentFixture<ModalCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
