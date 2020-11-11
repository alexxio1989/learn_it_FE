import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParagrafoNewComponent } from './modal-paragrafo-new.component';

describe('ModalParagrafoNewComponent', () => {
  let component: ModalParagrafoNewComponent;
  let fixture: ComponentFixture<ModalParagrafoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParagrafoNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParagrafoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
