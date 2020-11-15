import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSigninUserComponent } from './modal-signin-user.component';

describe('ModalSigninUserComponent', () => {
  let component: ModalSigninUserComponent;
  let fixture: ComponentFixture<ModalSigninUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSigninUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSigninUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
