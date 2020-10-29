import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LezioneEditComponent } from './lezione-edit.component';

describe('LezioneEditComponent', () => {
  let component: LezioneEditComponent;
  let fixture: ComponentFixture<LezioneEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LezioneEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LezioneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
