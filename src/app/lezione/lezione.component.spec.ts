import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LezioneComponent } from './lezione.component';

describe('LezioneComponent', () => {
  let component: LezioneComponent;
  let fixture: ComponentFixture<LezioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LezioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
