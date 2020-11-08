import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCorsoEditComponent } from './modal-corso-edit.component';

describe('ModalCorsoEditComponent', () => {
  let component: ModalCorsoEditComponent;
  let fixture: ComponentFixture<ModalCorsoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCorsoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCorsoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
