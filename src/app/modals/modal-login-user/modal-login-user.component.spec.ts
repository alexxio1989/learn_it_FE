import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginUserComponent } from './modal-login-user.component';

describe('ModalLoginUserComponent', () => {
  let component: ModalLoginUserComponent;
  let fixture: ComponentFixture<ModalLoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLoginUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
