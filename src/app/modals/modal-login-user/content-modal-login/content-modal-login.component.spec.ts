import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalLoginComponent } from './content-modal-login.component';

describe('ContentModalLoginComponent', () => {
  let component: ContentModalLoginComponent;
  let fixture: ComponentFixture<ContentModalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentModalLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
