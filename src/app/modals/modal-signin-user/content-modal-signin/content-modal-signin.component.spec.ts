import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalSigninComponent } from './content-modal-signin.component';

describe('ContentModalSigninComponent', () => {
  let component: ContentModalSigninComponent;
  let fixture: ComponentFixture<ContentModalSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentModalSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
