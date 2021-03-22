import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewFeedbackComponent } from './modal-new-feedback.component';

describe('ModalNewFeedbackComponent', () => {
  let component: ModalNewFeedbackComponent;
  let fixture: ComponentFixture<ModalNewFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
