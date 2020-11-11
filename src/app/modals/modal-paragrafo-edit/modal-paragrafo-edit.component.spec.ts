import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParagrafoEditComponent } from './modal-paragrafo-edit.component';

describe('ModalParagrafoEditComponent', () => {
  let component: ModalParagrafoEditComponent;
  let fixture: ComponentFixture<ModalParagrafoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParagrafoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParagrafoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
